
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, User, Bell, Settings, Clock, Calendar, Home, CreditCard, Heart, Briefcase } from 'lucide-react';
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
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
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
          
          <div className="space-y-6">
            {/* 주거 카테고리 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Home className="w-4 h-4 text-purple-600" />
                <h4 className="text-sm font-semibold text-gray-800">주거</h4>
              </div>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-purple-600 rounded"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">청년 주거 지원</p>
                        <p className="text-sm text-gray-500">월세 지원</p>
                      </div>
                    </div>
                    <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      신청
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 금융 카테고리 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-semibold text-gray-800">금융</h4>
              </div>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-600 rounded"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">청년도약계좌</p>
                        <p className="text-sm text-gray-500">월 70만원 적금</p>
                      </div>
                    </div>
                    <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      신청
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 복지 카테고리 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-4 h-4 text-green-600" />
                <h4 className="text-sm font-semibold text-gray-800">복지</h4>
              </div>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-green-600 rounded"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">청년 건강 지원</p>
                        <p className="text-sm text-gray-500">의료비 지원</p>
                      </div>
                    </div>
                    <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      신청
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 취업 카테고리 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Briefcase className="w-4 h-4 text-yellow-600" />
                <h4 className="text-sm font-semibold text-gray-800">취업</h4>
              </div>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-yellow-600 rounded"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">청년 취업 지원</p>
                        <p className="text-sm text-gray-500">취업 준비</p>
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
      </div>
    </div>
  );
};

export default Index;
