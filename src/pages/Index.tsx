
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, User, Bell, Settings, Clock, Calendar, Home, CreditCard, Heart, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CharacterImage from '@/components/CharacterImage';

const Index = () => {
  const navigate = useNavigate();

  const handleChatStart = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with enhanced title */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-blue-600 text-lg font-bold">청</span>
              </div>
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-white" />
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          {/* Enhanced service title with character and uploaded image */}
          <div className="text-center">
            <div className="relative inline-block mb-3">
              <img 
                src="/lovable-uploads/f8de653e-3501-4fff-ae50-a09eb0d9dd65.png"
                alt="청정서울 배경"
                className="w-full h-40 object-cover rounded-2xl opacity-20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Character Image */}
                <div className="relative mb-2">
                  <CharacterImage
                    src="/lovable-uploads/68cb0a25-104a-457e-a8d1-e389300b23e1.png"
                    alt="청정서울 캐릭터"
                    className="w-16 h-16 object-contain mx-auto"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">청정서울</h1>
                <p className="text-white/90 text-sm drop-shadow-md">깨끗하고 건강한 서울을 위한 청년정책</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Deadline Alert Card */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                      마감 임박
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">청년도약계좌</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    월 70만원까지 적금, 정부지원금 최대 1,200만원
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-red-600">
                    <Calendar className="w-3 h-3" />
                    <span className="font-medium">12월 31일 마감 (D-5)</span>
                  </div>
                </div>
              </div>
              <button className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-full font-medium hover:bg-red-600 transition-colors">
                신청
              </button>
            </div>
          </CardContent>
        </Card>

        {/* AI Consultation Card */}
        <Card className="bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50 border-pink-200 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="relative inline-block">
                <CharacterImage
                  src="/lovable-uploads/95645041-14e5-4a3f-9eff-7664e88ee5fd.png"
                  alt="귀여운 캐릭터들"
                  className="w-32 h-24 object-contain mx-auto mb-3"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              🌟 청년정책 AI 상담 🌟
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">
              정부에서 지원하는 다양한 청년정책을<br/>
              <span className="text-pink-600 font-medium">AI가 맞춤형으로</span> 추천해드려요! 💝
            </p>
            <button
              onClick={handleChatStart}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-3 px-4 rounded-2xl font-medium hover:from-pink-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>AI 상담 시작하기 ✨</span>
            </button>
            <div className="flex justify-center mt-3 space-x-1">
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </CardContent>
        </Card>

        {/* Services Section - Compact Grid Layout */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">서비스</h3>
            <button className="text-sm text-gray-500">전체</button>
          </div>
          
          {/* Compact 2x2 Grid Layout for Services */}
          <div className="grid grid-cols-2 gap-2">
            {/* 주거 */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Home className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm">주거 지원</h4>
                  <p className="text-xs text-gray-500 mb-2">월세 지원</p>
                  <button className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full font-medium hover:bg-purple-600 transition-colors">
                    신청
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 금융 */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm">도약계좌</h4>
                  <p className="text-xs text-gray-500 mb-2">월 70만원</p>
                  <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium hover:bg-blue-600 transition-colors">
                    신청
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 복지 */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm">건강 지원</h4>
                  <p className="text-xs text-gray-500 mb-2">의료비 지원</p>
                  <button className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium hover:bg-green-600 transition-colors">
                    신청
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 취업 */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Briefcase className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm">취업 지원</h4>
                  <p className="text-xs text-gray-500 mb-2">취업 준비</p>
                  <button className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-medium hover:bg-yellow-600 transition-colors">
                    신청
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
