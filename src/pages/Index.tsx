
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, User, Bell, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  const handleChatStart = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">청</span>
            </div>
            <span className="font-medium text-gray-900">청년정책</span>
          </div>
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Greeting Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">내일 카드값이 결제예정이에요</p>
                <p className="font-medium text-gray-900">맞춤형 카드 컨설팅</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Service Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">청년정책 AI 상담</h2>
            <p className="text-sm text-gray-600 mb-4">
              정부에서 지원하는 다양한 청년정책을 AI가 맞춤형으로 추천해드려요
            </p>
            <button
              onClick={handleChatStart}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>AI 상담 시작하기</span>
            </button>
          </CardContent>
        </Card>

        {/* Services Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">서비스</h3>
            <button className="text-sm text-gray-500">전체</button>
          </div>
          
          <div className="space-y-3">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">청년도약계좌</p>
                      <p className="text-sm text-gray-500">월</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    신청
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-purple-600 rounded"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">청년 주거 지원</p>
                      <p className="text-sm text-gray-500">월</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    신청
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-yellow-600 rounded"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">청년 취업 지원</p>
                      <p className="text-sm text-gray-500">월</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    신청
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center py-2 text-blue-600">
              <div className="w-6 h-6 mb-1"></div>
              <span className="text-xs">홈</span>
              <div className="w-4 h-1 bg-blue-600 rounded-full mt-1"></div>
            </button>
            <button className="flex flex-col items-center py-2 text-gray-400">
              <div className="w-6 h-6 mb-1"></div>
              <span className="text-xs">혜택</span>
            </button>
            <button className="flex flex-col items-center py-2 text-gray-400">
              <div className="w-6 h-6 mb-1"></div>
              <span className="text-xs">송금</span>
            </button>
            <button className="flex flex-col items-center py-2 text-gray-400">
              <div className="w-6 h-6 mb-1"></div>
              <span className="text-xs">주식</span>
            </button>
            <button className="flex flex-col items-center py-2 text-gray-400">
              <div className="w-6 h-6 mb-1"></div>
              <span className="text-xs">전체</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
