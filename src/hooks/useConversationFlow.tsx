
import { useState, useEffect } from 'react';
import { Message } from '@/components/ChatInterface';
import { v4 as uuidv4 } from 'uuid';

// Flow chart steps
type ConversationStep = 
  | 'GREETING'
  | 'POLICY_INFO_OPTIONS'
  | 'POLICY_RESPONSE'
  | 'ASK_ADDITIONAL_QUESTIONS'
  | 'ACTION_OPTIONS'
  | 'ASK_NEW_SEARCH'
  | 'COLLECT_USER_PROFILE'
  | 'COLLECT_USER_FEEDBACK'
  | 'END';

interface UserProfile {
  age?: string;
  location?: string;
  situation?: string;
}

export const useConversationFlow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('GREETING');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [conversationContext, setConversationContext] = useState<string[]>([]);

  // Function to add a bot message
  const addBotMessage = (content: string | React.ReactNode) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      type: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
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
  };

  // Function to handle sending messages
  const handleSendMessage = (message: string) => {
    addUserMessage(message);
    
    // Update the conversation context with the user's message
    setConversationContext(prev => [...prev, message]);
    
    // Handle different steps in the conversation flow
    switch (currentStep) {
      case 'ASK_ADDITIONAL_QUESTIONS':
        // Simulate LLM processing additional questions
        setTimeout(() => {
          addBotMessage("추가 질문에 대한 답변입니다. 정책에 관한 자세한 내용을 분석하고 있습니다...");
          
          setTimeout(() => {
            addBotMessage("분석 결과, 귀하의 질문에 해당하는 정보는 다음과 같습니다: [정책 상세 정보]");
            setCurrentStep('ACTION_OPTIONS');
            setOptions([
              "상세정보 보기", 
              "정보 저장하기", 
              "공유하기", 
              "신청방법 안내"
            ]);
            setInputDisabled(true);
          }, 1500);
        }, 1000);
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
          
          setTimeout(() => {
            setCurrentStep('COLLECT_USER_FEEDBACK');
            addBotMessage("정책 안내 서비스에 대한 피드백을 남겨주세요. 서비스 개선에 큰 도움이 됩니다.");
            setInputDisabled(false);
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
        // Default handling for free text input
        addBotMessage("메시지를 받았습니다. 잠시 후 답변 드리겠습니다.");
    }
  };

  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    addUserMessage(option);
    
    switch (currentStep) {
      case 'GREETING':
        // Start the conversation
        setCurrentStep('POLICY_INFO_OPTIONS');
        setTimeout(() => {
          addBotMessage("원하시는 정책 안내 방식을 선택해 주세요.");
          setOptions([
            "정책 상세 정보 보기", 
            "관련 정책 찾기", 
            "정책 정보 공유하기", 
            "신청 방법 안내"
          ]);
        }, 500);
        break;
        
      case 'POLICY_INFO_OPTIONS':
        // Process policy information request
        setCurrentStep('POLICY_RESPONSE');
        setInputDisabled(true);
        
        // Display thinking state to simulate LLM processing
        addBotMessage("선택하신 옵션에 대한 정보를 찾고 있습니다...");
        
        // Simulate LLM response
        setTimeout(() => {
          if (option === "정책 상세 정보 보기") {
            addBotMessage(`청년 일자리 지원 정책에 관한 상세 정보입니다:\n
1. 청년취업지원 프로그램: 만 34세 이하 청년 대상, 월 50만원 지원
2. 청년창업 지원 사업: 만 39세 이하 청년 대상, 최대 1억원 지원 및 멘토링 제공
3. 청년주거안정 지원: 만 34세 이하, 무주택 청년 대상 월세 지원`);
          } else if (option === "관련 정책 찾기") {
            addBotMessage(`귀하와 관련된 청년 지원 정책은 다음과 같습니다:\n
1. 청년 구직활동 지원금: 최대 300만원 지원
2. 청년 전월세 특별 보증: 보증금 최대 5천만원 보증
3. 청년 창업 교육 프로그램: 무료 교육 및 컨설팅 제공`);
          } else if (option === "정책 정보 공유하기") {
            addBotMessage("공유하고자 하는 정책 정보를 선택해주세요. 카카오톡, 문자, 이메일 등으로 공유 가능합니다.");
          } else {
            addBotMessage(`신청 방법 안내입니다:\n
1. 온라인 신청: 정부24(www.gov.kr) 접속 → 청년정책 메뉴 → 원하는 정책 검색 → 신청서 작성
2. 방문 신청: 가까운 주민센터 또는 고용센터 방문 → 신청서 작성 및 제출
3. 모바일 신청: 정부24 앱 또는 복지로 앱 다운로드 → 회원가입 → 정책 검색 및 신청`);
          }
          
          setCurrentStep('ASK_ADDITIONAL_QUESTIONS');
          setTimeout(() => {
            addBotMessage("추가적인 질문이 있으신가요?");
            setOptions(["네, 더 질문할 게 있어요", "아니요, 충분합니다"]);
          }, 1000);
        }, 2000);
        break;
        
      case 'ASK_ADDITIONAL_QUESTIONS':
        if (option === "네, 더 질문할 게 있어요") {
          setInputDisabled(false);
          addBotMessage("어떤 점이 더 궁금하신지 자유롭게 질문해 주세요.");
        } else {
          setCurrentStep('ACTION_OPTIONS');
          addBotMessage("어떤 작업을 진행하시겠습니까?");
          setOptions([
            "상세정보 보기", 
            "정보 저장하기", 
            "공유하기", 
            "신청방법 안내"
          ]);
        }
        break;
        
      case 'ACTION_OPTIONS':
        // Process action selection
        if (option === "상세정보 보기") {
          addBotMessage(`선택하신 정책의 상세 정보입니다:\n
지원 대상: 만 19세 ~ 34세 청년
지원 내용: 월 최대 50만원, 최대 6개월간 지원
신청 기간: 매년 1월, 7월 (연 2회)
제출 서류: 신분증, 구직활동 증빙서류, 통장사본
문의처: 02-1234-5678 (청년지원정책과)`);
        } else if (option === "정보 저장하기") {
          addBotMessage("정책 정보가 저장되었습니다. 마이페이지에서 확인하실 수 있습니다.");
        } else if (option === "공유하기") {
          addBotMessage("공유 방식을 선택해 주세요: 카카오톡 / 문자 / 이메일 / 페이스북 / 트위터");
        } else {
          addBotMessage(`신청 방법 안내입니다:\n
1. 온라인 신청: 정부24(www.gov.kr) 접속 → 청년정책 메뉴 → 원하는 정책 검색 → 신청서 작성
2. 방문 신청: 가까운 주민센터 또는 고용센터 방문 → 신청서 작성 및 제출
3. 모바일 신청: 정부24 앱 또는 복지로 앱 다운로드 → 회원가입 → 정책 검색 및 신청`);
        }
        
        setTimeout(() => {
          setCurrentStep('ASK_NEW_SEARCH');
          addBotMessage("다른 정책에 대해 새로 검색하시겠습니까?");
          setOptions(["네, 새로 검색할게요", "아니요, 종료할게요"]);
        }, 1500);
        break;
        
      case 'ASK_NEW_SEARCH':
        if (option === "네, 새로 검색할게요") {
          setCurrentStep('POLICY_INFO_OPTIONS');
          addBotMessage("어떤 정책 정보가 필요하신가요?");
          setOptions([
            "정책 상세 정보 보기", 
            "관련 정책 찾기", 
            "정책 정보 공유하기", 
            "신청 방법 안내"
          ]);
        } else {
          // Check if we have profile information
          if (Object.keys(userProfile).length === 0) {
            setCurrentStep('COLLECT_USER_PROFILE');
            addBotMessage("대화를 종료하기 전에, 더 정확한 정책 추천을 위해 간단한 정보를 입력해 주세요.");
            addBotMessage("먼저, 나이를 알려주세요. (예: 28세)");
            setInputDisabled(false);
          } else {
            setCurrentStep('COLLECT_USER_FEEDBACK');
            addBotMessage("정책 안내 서비스에 대한 피드백을 남겨주세요. 서비스 개선에 큰 도움이 됩니다.");
            setInputDisabled(false);
          }
        }
        break;
        
      case 'END':
        if (option === "처음으로") {
          // Reset the conversation
          setMessages([]);
          setCurrentStep('GREETING');
          setUserProfile({});
          setConversationContext([]);
          initializeConversation();
        }
        break;
    }
  };

  // Function to initialize the conversation
  const initializeConversation = () => {
    addBotMessage("안녕하세요! 청년정책 안내봇입니다. 다양한 청년지원정책에 대한 정보를 안내해 드립니다.");
    setTimeout(() => {
      addBotMessage("시작하시려면 '시작하기' 버튼을 눌러주세요.");
      setOptions(["시작하기"]);
    }, 500);
  };

  // Initialize conversation on first load
  useEffect(() => {
    initializeConversation();
  }, []);

  return {
    messages,
    options,
    inputDisabled,
    handleSendMessage,
    handleOptionSelect,
    currentStep,
  };
};
