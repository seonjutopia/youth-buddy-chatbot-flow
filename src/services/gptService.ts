
import { toast } from "sonner";

interface GPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GPTResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const generatePolicyResponse = async (messages: GPTMessage[]): Promise<string> => {
  try {
    // 여기에 실제 OpenAI API 키를 입력하거나 환경 변수에서 가져와야 합니다
    const apiKey = ""; // 실제 배포 시에는 환경 변수나 안전한 방법으로 API 키 관리 필요
    
    if (!apiKey) {
      console.warn("API 키가 설정되지 않았습니다. 예시 응답을 반환합니다.");
      return generateMockResponse(messages[messages.length - 1].content);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o", // gpt-3.5-turbo나 다른 모델을 사용할 수도 있습니다
        messages: [
          {
            role: "system",
            content: `당신은 청년들에게 정책 정보를 제공하는 정책 상담사입니다. 
            청년들이 이용할 수 있는 다양한 정책(취업, 주거, 교육, 창업 등)에 대한 정보를 친절하게 안내해주세요.
            정책의 지원 대상, 지원 내용, 신청 방법, 신청 기간, 문의처 등에 대해 구체적으로 안내해주세요.
            대한민국 정부와 각 지방자치단체에서 제공하는 청년 정책에 대해 알려주세요.
            정확한 정보를 제공하고, 만약 특정 정보를 모른다면 솔직하게 모른다고 말해주세요.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GPT API 오류:", errorData);
      throw new Error("정책 정보를 가져오는데 실패했습니다.");
    }

    const data: GPTResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("정책 정보 생성 오류:", error);
    toast.error("정책 정보를 가져오는데 문제가 발생했습니다.");
    return "죄송합니다. 정책 정보를 가져오는 중에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};

// API 키가 없을 때 사용할 예시 응답 생성기
const generateMockResponse = (query: string): string => {
  if (query.includes("취업") || query.includes("일자리")) {
    return `청년 취업 지원 정책에 대한 정보입니다:

1. 청년취업성공패키지: 만 34세 이하 청년 대상, 취업 상담부터 교육, 취업 알선까지 종합 지원
   - 지원내용: 1단계(상담) → 2단계(직업훈련) → 3단계(취업알선)
   - 훈련비 최대 500만원 지원 및 참여수당 월 50만원
   - 신청방법: 가까운 고용센터 방문 또는 워크넷 온라인 신청

2. 청년내일채움공제: 중소기업 취업 청년의 자산형성 지원
   - 2년형: 본인 300만원 + 정부 900만원 + 기업 400만원 = 총 1,600만원
   - 3년형: 본인 600만원 + 정부 1,800만원 + 기업 600만원 = 총 3,000만원
   - 신청방법: 워크넷 청년내일채움공제 홈페이지에서 신청`;
  } else if (query.includes("주거") || query.includes("집")) {
    return `청년 주거 지원 정책 정보입니다:

1. 청년 전용 버팀목 전세자금 대출
   - 대상: 만 19세~34세 이하 청년
   - 내용: 최대 7천만원까지 전세자금 대출, 금리 1.8~2.7%
   - 신청방법: 주택도시기금 수탁은행 방문 신청

2. 청년 매입임대주택
   - 대상: 만 19세~39세 이하 무주택 청년
   - 내용: 시중 임대료의 30~50% 수준으로 최대 6년간 거주 가능
   - 신청방법: LH 청약센터 홈페이지 신청

3. 청년 주거급여 분리지급
   - 대상: 기준 중위소득 46% 이하 가구의 청년
   - 내용: 본인 명의 주거지가 있는 경우 별도 주거급여 지급
   - 신청방법: 주민센터 방문 신청`;
  } else if (query.includes("교육") || query.includes("학비")) {
    return `청년 교육 지원 정책 정보입니다:

1. 국가장학금
   - 대상: 대학생 중 소득 8구간(분위) 이하
   - 내용: 소득 수준에 따라 학기당 최대 350만원 지원
   - 신청방법: 한국장학재단 홈페이지에서 신청

2. 청년 희망사다리 장학금
   - 대상: 중소기업 취업 또는 창업 예정인 대학생
   - 내용: 등록금 전액 및 학업지원비 200만원 지원
   - 의무사항: 졸업 후 중소기업 취업 또는 창업
   - 신청방법: 한국장학재단 홈페이지에서 신청`;
  } else if (query.includes("창업")) {
    return `청년 창업 지원 정책 정보입니다:

1. 청년창업사관학교
   - 대상: 만 39세 이하 예비창업자 또는 3년 미만 기업의 대표자
   - 내용: 창업 공간, 시제품 제작, 마케팅 등에 최대 1억원 지원
   - 신청방법: 중소벤처기업부 K-스타트업 홈페이지에서 신청

2. 청년 스타트업 창업패키지
   - 대상: 만 39세 이하 예비창업자
   - 내용: 창업교육, 멘토링, 사업화자금 최대 1억원 지원
   - 신청방법: 창업진흥원 홈페이지에서 신청`;
  } else {
    return `청년정책에 관한 질문에 답변드립니다. 좀 더 구체적인 질문을 해주시면 더 자세한 정보를 제공해드릴 수 있습니다.

주요 청년정책 분야:
1. 취업 지원: 취업성공패키지, 청년내일채움공제 등
2. 창업 지원: 창업사관학교, 창업패키지 등
3. 주거 지원: 청년 전세자금 대출, 매입임대주택 등
4. 금융 지원: 학자금 대출 이자 지원, 청년 소득공제 등
5. 복지 지원: 청년기본소득, 문화누리카드 등

어떤 분야에 관심이 있으신가요?`;
  }
};
