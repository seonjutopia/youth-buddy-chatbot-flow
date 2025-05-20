import { useState, useEffect } from 'react';
import { Message } from '@/components/ChatInterface';
import { v4 as uuidv4 } from 'uuid';
import { generatePolicyResponse } from '@/services/gptService';

// Flow chart steps
type ConversationStep = 
  | 'GREETING'
  | 'POLICY_INFO_OPTIONS'
  | 'POLICY_RESPONSE'
  | 'ASK_ADDITIONAL_QUESTIONS'
  | 'ACTION_OPTIONS'
  | 'ASK_NEW_SEARCH'
  | 'COLLECT_USER_FEEDBACK'
  | 'COLLECT_USER_PROFILE'
  | 'FREE_CONVERSATION'
  | 'END';

interface UserProfile {
  birthdate?: Date;
  gender?: 'male' | 'female' | 'other';
  location?: string;
  interests?: string;
  age?: string; // Added this field that's used in the code
  situation?: string; // Added this field that's used in the code
}

interface GPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const useConversationFlow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('GREETING');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [conversationContext, setConversationContext] = useState<GPTMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load user profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        // Convert string date to Date object
        if (parsedProfile.birthdate) {
          parsedProfile.birthdate = new Date(parsedProfile.birthdate);
        }
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  }, []);

  // Function to add a bot message
  const addBotMessage = (content: string | React.ReactNode) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      type: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Add to conversation context if content is string
    if (typeof content === 'string') {
      setConversationContext(prev => [...prev, { role: 'assistant', content }]);
    }
  };

  // Function to add a user message
  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      type: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Add to conversation context
    setConversationContext(prev => [...prev, { role: 'user', content }]);
  };

  // Function to handle sending messages
  const handleSendMessage = async (message: string) => {
    addUserMessage(message);
    setIsLoading(true);
    
    // Handle different steps in the conversation flow
    switch (currentStep) {
      case 'FREE_CONVERSATION':
      case 'ASK_ADDITIONAL_QUESTIONS':
        try {
          const response = await generatePolicyResponse(
            [...conversationContext, { role: 'user', content: message }]
          );
          addBotMessage(response);
          
          setTimeout(() => {
            setCurrentStep('ACTION_OPTIONS');
            setOptions([
              "다른 질문하기", 
              "정보 저장하기", 
              "공유하기", 
              "신청방법 자세히 알아보기"
            ]);
            setInputDisabled(true);
          }, 1000);
        } catch (error) {
          console.error("LLM 응답 생성 오류:", error);
          addBotMessage("죄송합니다. 정보를 가져오는 중에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
          setIsLoading(false);
        }
        break;
        
      case 'COLLECT_USER_PROFILE':
        // Process user profile information
        if (message.includes("나이") || message.includes("세")) {
          setUserProfile(prev => ({ ...prev, age: message }));
          addBotMessage("나이 정보가 저장되었습니다. 지역(시/도)을 알려주세요.");
        } else if (message.includes("시") || message.includes("도") || message.includes("군") || message.includes("구")) {
          setUserProfile(prev => ({ ...prev, location: message }));
          addBotMessage("지역 정보가 저장되었습니다. 현재 상황(취업준비/창업준비/재직중 등)을 알려주세요.");
        } else {
          setUserProfile(prev => ({ ...prev, situation: message }));
          addBotMessage(`프로필 정보가 모두 저장되었습니다.\n
나이: ${userProfile.age || "미입력"}\n
지역: ${userProfile.location || "미입력"}\n
상황: ${message}\n\n
이 정보를 바탕으로 맞춤형 정책을 찾아드리겠습니다.`);
          
          // 사용자 프로필 기반 맞춤형 정책 정보 요청
          setTimeout(async () => {
            try {
              setIsLoading(true);
              const profilePrompt = `제 나이는 ${userProfile.age || "미입력"}, 지역은 ${userProfile.location || "미입력"}, 현재 상황은 ${message}입니다. 이런 상황에 맞는 청년 정책을 추천해주세요.`;
              
              addBotMessage("맞춤형 정책 정보를 분석하고 있습니다...");
              
              const response = await generatePolicyResponse(
                [...conversationContext, { role: 'user', content: profilePrompt }]
              );
              
              addBotMessage(response);
              setCurrentStep('ACTION_OPTIONS');
              setOptions([
                "다른 질문하기", 
                "정보 저장하기", 
                "공유하기", 
                "신청방법 자세히 알아보기"
              ]);
              setInputDisabled(true);
            } catch (error) {
              console.error("맞춤형 정책 정보 오류:", error);
              addBotMessage("죄송합니다. 맞춤형 정책 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
              setCurrentStep('ACTION_OPTIONS');
              setOptions(["처음으로 돌아가기"]);
              setInputDisabled(true);
            } finally {
              setIsLoading(false);
            }
          }, 1500);
        }
        break;
        
      case 'COLLECT_USER_FEEDBACK':
        addBotMessage("소중한 피드백 감사합니다. 더 나은 서비스를 제공하기 위해 노력하겠습니다.");
        setCurrentStep('END');
        setTimeout(() => {
          addBotMessage("대화가 종료되었습니다. 더 필요한 사항이 있으시면 언제든지 다시 문의해 주세요.");
          setInputDisabled(true);
          setOptions(["처음으로"]);
        }, 1000);
        break;
        
      default:
        // 기본적인 텍스트 입력 처리
        addBotMessage("메시지를 받았습니다. 잠시 후 답변 드리겠습니다.");
        setIsLoading(false);
    }
  };

  // Function to handle option selection
  const handleOptionSelect = async (option: string) => {
    addUserMessage(option);
    
    switch (currentStep) {
      case 'GREETING':
        // 대화 시작
        setCurrentStep('FREE_CONVERSATION');
        setTimeout(() => {
          // 개인화된 환영 메시지 및 정책 추천
          let welcomeMessage = "안녕하세요! 청년정책 AI 상담 서비스입니다. ";
          
          if (userProfile && userProfile.interests) {
            welcomeMessage += `${userProfile.interests}에 관심이 있으신 것으로 확인되었습니다.\n\n`;
            
            // 관심사에 따른 맞춤형 정책 추천
            switch(userProfile.interests) {
              case "취업지원":
                welcomeMessage += "취업지원 관련 추천 정책:\n1. 청년취업성공패키지: 만 18-34세 청년 대상 단계별 취업지원 서비스\n2. 청년내일채움공제: 중소기업 취업 청년 자산형성 지원\n3. 국민취업지원제도: 취업지원서비스와 소득지원 결합 서비스";
                break;
              case "주거지원":
                welcomeMessage += "주거지원 관련 추천 정책:\n1. 청년 전용 버팀목 전세 특별보증: 만 19-34세 청년층 전용 전세대출 지원\n2. 청년 매입임대주택: 시세 70% 이하 임대료로 최장 6년 거주 가능\n3. 행복주택: 대학생, 사회초년생, 신혼부부 등 청년층 특화 임대주택";
                break;
              case "금융지원":
                welcomeMessage += "금융지원 관련 추천 정책:\n1. 청년희망적금: 저소득 청년층 자산형성 지원\n2. 청년 임차보증금 융자: 청년 주거비 부담 완화 위한 임차보증금 대출\n3. 햇살론유스: 저신용 청년층 대상 서민금융진흥원 지원 대출";
                break;
              case "교육지원":
                welcomeMessage += "교육지원 관련 추천 정책:\n1. 국가장학금: 대학생 등록금 부담 경감 위한 장학금\n2. 학자금대출: 교육부와 한국장학재단을 통한 저리 대출\n3. K-MOOC: 대학 수준의 우수 강의를 무료로 제공하는 온라인 강좌";
                break;
              case "창업지원":
                welcomeMessage += "창업지원 관련 추천 정책:\n1. 청년창업사관학교: 유망 청년창업가 발굴 및 집중지원\n2. 창업성공패키지: 창업 교육, 멘토링, 사업화 자금까지 종합지원\n3. 1인 창조기업 지원센터: 사무공간 제공 및 경영·마케팅·세무 등 전문가 상담";
                break;
              case "문화지원":
                welcomeMessage += "문화지원 관련 추천 정책:\n1. 청년문화패스: 청년층 문화활동 지원 바우처\n2. 통합문화이용권(문화누리카드): 경제적 취약계층 대상 문화예술 지원금\n3. 지역 청년예술가 지원사업: 지역 기반 청년예술가 창작활동 지원";
                break;
              case "건강지원":
                welcomeMessage += "건강지원 관련 추천 정책:\n1. 청년 마음건강바우처: 청년층 심리상담 서비스 비용 지원\n2. 청년층 국가건강검진: 청년 특화 건강검진 지원\n3. 청년 구강건강 지원사업: 취약계층 청년 치과 진료비 지원";
                break;
              default:
                welcomeMessage += "어떤 정책에 관심이 있으신가요? 자유롭게 질문해 주세요.";
            }
          } else {
            welcomeMessage += "어떤 정책에 관심이 있으신가요? 자유롭게 질문해 주세요.";
          }
          
          addBotMessage(welcomeMessage);
          setInputDisabled(false);
        }, 500);
        break;
        
      case 'POLICY_INFO_OPTIONS':
      case 'ASK_ADDITIONAL_QUESTIONS':
      case 'ACTION_OPTIONS':
      case 'ASK_NEW_SEARCH':
      case 'END':
        // ... keep existing code for these cases
    }
  };

  // 대화 초기화 함수
  const initializeConversation = () => {
    // Add user profile information to first message if available
    let welcomeMessage = "안녕하세요! 청년정책 안내 서비스입니다. GPT를 활용한 지능형 정책 정보를 제공합니다.";
    
    if (userProfile && userProfile.interests) {
      welcomeMessage += `\n\n${userProfile.interests}에 관심이 있으신 것으로 확인되었습니다. 맞춤 정보를 제공해드리겠습니다.`;
      
      // Add initial context based on user profile
      setConversationContext([
        { 
          role: 'system', 
          content: `이 사용자는 다음과 같은 프로필을 가지고 있습니다:
          - 생년월일: ${userProfile.birthdate ? new Date(userProfile.birthdate).toLocaleDateString('ko-KR') : '정보 없음'}
          - 성별: ${userProfile.gender === 'male' ? '남성' : userProfile.gender === 'female' ? '여성' : '정보 없음'}
          - 거주지: ${userProfile.location || '정보 없음'}
          - 관심분야: ${userProfile.interests || '정보 없음'}`
        }
      ]);
    }
    
    addBotMessage(welcomeMessage);
    setTimeout(() => {
      addBotMessage("시작하시려면 '시작하기' 버튼을 눌러주세요.");
      setOptions(["시작하기"]);
    }, 500);
  };

  // 첫 로드 시 대화 초기화
  useEffect(() => {
    initializeConversation();
  }, [userProfile]); // Re-initialize when userProfile changes

  return {
    messages,
    options,
    inputDisabled,
    handleSendMessage,
    handleOptionSelect,
    currentStep,
    isLoading
  };
};
