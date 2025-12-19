import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, AlertCircle, Wheat } from "lucide-react";
import { getCategoriesAchievement, getAchievements } from "@/services/achievement-service";
import { AchievementItem } from "../../../types/api-types";

interface AwardsComponentProps {
  selectedCategory: string;
}

// Helper function to get initials from name
const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default async function AwardsComponent({ selectedCategory }: AwardsComponentProps) {
  // Fetch categories and achievements data
  const [categoriesResponse, achievementsResponse] = await Promise.all([getCategoriesAchievement(), getAchievements(selectedCategory)]);
  const categories = categoriesResponse.Data || [];

  // Find current category
  const currentCategory = categories.find((cat) => cat.URLSegment === selectedCategory);

  // Fetch achievements for selected category

  const achievements = Array.isArray(achievementsResponse?.Data) ? achievementsResponse.Data : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:w-80 flex-shrink-0">
            <Card className="shadow-lg sticky top-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-xl font-bold text-gray-800">Award Categories</h2>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.ID}
                      href={`/about/achievement/${category.URLSegment}`}
                      className={`block w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.URLSegment ? "bg-yellow-400 text-gray-900 shadow-md font-semibold" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      <div className="text-sm leading-snug">{category.Title || "empty"}</div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Winners Grid */}
          <div className="flex-1">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {currentCategory && (
                  <>
                    <div className="mb-8 flex items-center gap-4 relative">
                      <div className="max-w-9/10">
                        <h1 className="text-3xl font-bold text-gray-700 uppercase tracking-tight">{currentCategory.Title}</h1>
                        <p className="text-gray-500 text-sm mt-2">Celebrating our top {currentCategory.Count} achievers</p>
                      </div>
                      <div className="absolute right-0 top-0">
                        <Wheat className="w-16 h-16 text-yellow-500" strokeWidth={1.5} />
                      </div>
                    </div>

                    {achievements.length > 0 ? (
                      <>
                        {/* Person Winners Display (DataType: "person" or default) */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                          {achievements.map((achievement, index) => {
                            const hasPhoto = achievement.Photo && achievement.Photo.Medium;
                            const displayName = achievement.Agent ? achievement.Agent.Name : achievement.CustomName || "";

                            return (
                              <div key={achievement.ID} className="relative flex flex-col items-center">
                                {/* Rank Badge */}
                                <Badge className="absolute -top-2 -right-2 z-10 bg-yellow-400 text-gray-900 hover:bg-yellow-400 text-base font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                                  {index + 1}
                                </Badge>

                                {/* Profile Card */}
                                <div className="w-full h-full bg-white rounded-2xl border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl overflow-hidden">
                                  {/* Profile Image Circle */}
                                  <div className="flex justify-center pt-6 pb-4">
                                    {hasPhoto ? (
                                      <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg relative">
                                        <Image src={achievement.Photo!.Medium} alt={displayName} fill className="object-cover" sizes="128px" />
                                      </div>
                                    ) : (
                                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                        {getInitials(displayName)}
                                      </div>
                                    )}
                                  </div>

                                  {/* Info Section */}
                                  {achievement.Type === "AGEN" && (
                                    <div className="px-4 pb-6 text-center h-full">
                                      <h3 className="font-bold text-sm text-gray-900 mb-1">{displayName}</h3>
                                      {achievement.Agent && <h5 className="text-gray-600 font-normal text-label-xl">({achievement?.Agent?.Office?.Title})</h5>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-16">
                        <Trophy className="w-24 h-24 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
                        <p className="text-gray-500 text-lg">No achievements data available for this category</p>
                        <p className="text-gray-400 text-sm mt-2">Please select another category</p>
                      </div>
                    )}
                  </>
                )}

                {!currentCategory && (
                  <div className="text-center py-16">
                    <AlertCircle className="w-24 h-24 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="text-gray-500 text-lg">Category not found</p>
                    <p className="text-gray-400 text-sm mt-2">Please select a valid category</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
