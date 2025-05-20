
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
  | 'COLLECT_USER_PROFILE'
  | 'COLLECT_USER_FEEDBACK'
  | 'FREE_CONVERSATION'
  | 'END';

interface UserProfile {
  age?: string;
  location?: string;
  situation?: string;
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
    }
    
    setIsLoading(false);
  };

  // Function to handle option selection
  const handleOptionSelect = async (option: string) => {
    addUserMessage(option);
    
    switch (currentStep) {
      case 'GREETING':
        // 대화 시작
        setCurrentStep('FREE_CONVERSATION');
        setTimeout(() => {
          addBotMessage("안녕하세요! 청년정책 안내 서비스입니다. 어떤 정책에 관심이 있으신가요? 자유롭게 질문해 주세요.");
          setInputDisabled(false);
        }, 500);
        break;
        
      case 'POLICY_INFO_OPTIONS':
        // 정책 정보 요청 처리
        setCurrentStep('POLICY_RESPONSE');
        setInputDisabled(true);
        setIsLoading(true);
        
        // LLM 처리 상태 표시
        addBotMessage("선택하신 옵션에 대한 정보를 찾고 있습니다...");
        
        try {
          const response = await generatePolicyResponse(
            [...conversationContext, { role: 'user', content: option }]
          );
          
          addBotMessage(response);
          
          setTimeout(() => {
            setCurrentStep('ASK_ADDITIONAL_QUESTIONS');
            addBotMessage("추가적인 질문이 있으신가요?");
            setOptions([
              "네, 더 질문할게요", 
              "아니요, 충분합니다"
            ]);
          }, 1000);
        } catch (error) {
          console.error("정책 정보 요청 오류:", error);
          addBotMessage("죄송합니다. 정보를 가져오는 중에 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
        break;
        
      case 'ASK_ADDITIONAL_QUESTIONS':
        if (option === "네, 더 질문할게요") {
          setCurrentStep('FREE_CONVERSATION');
          setInputDisabled(false);
          addBotMessage("어떤 점이 더 궁금하신지 자유롭게 질문해 주세요.");
        } else {
          setCurrentStep('ACTION_OPTIONS');
          addBotMessage("어떤 작업을 진행하시겠습니까?");
          setOptions([
            "다른 질문하기", 
            "정보 저장하기", 
            "공유하기", 
            "신청방법 자세히 알아보기"
          ]);
        }
        break;
        
      case 'ACTION_OPTIONS':
        // 액션 선택 처리
        if (option === "다른 질문하기") {
          setCurrentStep('FREE_CONVERSATION');
          setInputDisabled(false);
          addBotMessage("어떤 정보가 필요하신지 자유롭게 질문해 주세요.");
        } else if (option === "정보 저장하기") {
          addBotMessage("정책 정보가 저장되었습니다. 마이페이지에서 확인하실 수 있습니다.");
          setTimeout(() => {
            setCurrentStep('ASK_NEW_SEARCH');
            addBotMessage("다른 정책에 대해서도 알고 싶으신가요?");
            setOptions([
              "네, 더 알아보고 싶어요", 
              "아니요, 종료할게요"
            ]);
          }, 1000);
        } else if (option === "공유하기") {
          addBotMessage("공유 방식을 선택해 주세요: 카카오톡 / 문자 / 이메일 / 페이스북 / 트위터");
          setTimeout(() => {
            setCurrentStep('ASK_NEW_SEARCH');
            addBotMessage("다른 정책에 대해서도 알고 싶으신가요?");
            setOptions([
              "네, 더 알아보고 싶어요", 
              "아니요, 종료할게요"
            ]);
          }, 1500);
        } else if (option === "신청방법 자세히 알아보기") {
          setIsLoading(true);
          try {
            const response = await generatePolicyResponse(
              [...conversationContext, { role: 'user', content: "앞서 언급된 정책의 신청 방법에 대해 자세히 알려주세요." }]
            );
            addBotMessage(response);
          } catch (error) {
            console.error("신청 방법 정보 오류:", error);
            addBotMessage("죄송합니다. 신청 방법 정보를 가져오는데 실패했습니다.");
          } finally {
            setIsLoading(false);
            setTimeout(() => {
              setCurrentStep('ASK_NEW_SEARCH');
              addBotMessage("다른 정책에 대해서도 알고 싶으신가요?");
              setOptions([
                "네, 더 알아보고 싶어요", 
                "아니요, 종료할게요"
              ]);
            }, 1000);
          }
        } else if (option === "처음으로 돌아가기") {
          // 대화 리셋
          setMessages([]);
          setCurrentStep('GREETING');
          setUserProfile({});
          setConversationContext([]);
          initializeConversation();
        }
        break;
        
      case 'ASK_NEW_SEARCH':
        if (option === "네, 더 알아보고 싶어요") {
          setCurrentStep('FREE_CONVERSATION');
          addBotMessage("어떤 정책 정보가 더 필요하신가요? 자유롭게 질문해 주세요.");
          setInputDisabled(false);
        } else {
          // 사용자 프로필 정보가 있는지 확인
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
          // 대화 리셋
          setMessages([]);
          setCurrentStep('GREETING');
          setUserProfile({});
          setConversationContext([]);
          initializeConversation();
        }
        break;
    }
  };

  // 대화 초기화 함수
  const initializeConversation = () => {
    addBotMessage("안녕하세요! 청년정책 안내 서비스입니다. GPT를 활용한 지능형 정책 정보를 제공합니다.");
    setTimeout(() => {
      addBotMessage("시작하시려면 '시작하기' 버튼을 눌러주세요.");
      setOptions(["시작하기"]);
    }, 500);
  };

  // 첫 로드 시 대화 초기화
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
    isLoading
  };
};
