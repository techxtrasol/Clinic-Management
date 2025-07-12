"use client"

import { useState, useEffect } from "react"
import { Star, Quote, Heart, CheckCircle, Calendar } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/**
 * @typedef {object} Review
 * @property {number} id
 * @property {string} name
 * @property {string} [avatar]
 * @property {string} condition
 * @property {number} rating
 * @property {string} review
 * @property {string} date
 * @property {string} location
 * @property {boolean} verified
 * @property {string} treatment
 */

/** @type {Review[]} */
const patientReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    condition: "Diabetes Management",
    rating: 5,
    review:
      "ClinicPro transformed my diabetes care completely. The appointment scheduling is seamless, and my doctor can track my progress in real-time. I've never felt more in control of my health!",
    date: "2 weeks ago",
    location: "New York, NY",
    verified: true,
    treatment: "Endocrinology",
  },
  {
    id: 2,
    name: "Michael Chen",
    condition: "Hypertension",
    rating: 5,
    review:
      "The digital health records feature is incredible. All my test results, medications, and treatment history are organized perfectly. My blood pressure is now under control thanks to the coordinated care.",
    date: "1 month ago",
    location: "Los Angeles, CA",
    verified: true,
    treatment: "Cardiology",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    condition: "Chronic Pain",
    rating: 5,
    review:
      "After years of struggling with chronic pain, ClinicPro's integrated approach helped my doctors coordinate my treatment. The pain management program has given me my life back!",
    date: "3 weeks ago",
    location: "Chicago, IL",
    verified: true,
    treatment: "Pain Management",
  },
  {
    id: 4,
    name: "David Thompson",
    condition: "Heart Disease",
    rating: 5,
    review:
      "The cardiac monitoring through ClinicPro saved my life. Early detection of irregularities led to immediate treatment. The platform's analytics helped my cardiologist make crucial decisions.",
    date: "1 week ago",
    location: "Houston, TX",
    verified: true,
    treatment: "Cardiology",
  },
  {
    id: 5,
    name: "Lisa Park",
    condition: "Mental Health",
    rating: 5,
    review:
      "ClinicPro's mental health integration is outstanding. Coordinating between my therapist and psychiatrist has never been easier. My anxiety and depression are well-managed now.",
    date: "2 months ago",
    location: "Seattle, WA",
    verified: true,
    treatment: "Psychiatry",
  },
  {
    id: 6,
    name: "Robert Wilson",
    condition: "Arthritis",
    rating: 5,
    review:
      "The appointment reminders and medication tracking features are game-changers. My rheumatologist can monitor my joint health progress, and my mobility has improved significantly.",
    date: "3 weeks ago",
    location: "Miami, FL",
    verified: true,
    treatment: "Rheumatology",
  },
  {
    id: 7,
    name: "Jennifer Adams",
    condition: "Cancer Recovery",
    rating: 5,
    review:
      "During my cancer treatment, ClinicPro coordinated all my specialists seamlessly. The comprehensive care coordination helped me beat cancer and I'm now in full remission!",
    date: "1 month ago",
    location: "Boston, MA",
    verified: true,
    treatment: "Oncology",
  },
  {
    id: 8,
    name: "Mark Davis",
    condition: "Kidney Disease",
    rating: 5,
    review:
      "ClinicPro's lab integration and monitoring saved my kidneys. Early intervention through their platform prevented the need for dialysis. I'm incredibly grateful!",
    date: "2 weeks ago",
    location: "Phoenix, AZ",
    verified: true,
    treatment: "Nephrology",
  },
]

const ReviewCard = ({ review }) => {
  return (
    <Card className="group relative min-w-[380px] max-w-[380px] min-h-[280px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 overflow-hidden">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      <CardContent className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 ring-2 ring-blue-100 dark:ring-blue-900/30">
              <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                {review.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-slate-900 dark:text-white">{review.name}</h4>
                {review.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{review.location}</p>
            </div>
          </div>
          <Quote className="h-6 w-6 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "text-yellow-400 fill-current" : "text-slate-300 dark:text-slate-600"
              } transition-colors duration-300`}
            />
          ))}
          <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">({review.rating}.0)</span>
        </div>
        {/* Review Text */}
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-4">"{review.review}"</p>
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              <Heart className="h-3 w-3 mr-1" />
              {review.condition}
            </Badge>
          </div>
          <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-3 w-3" />
            {review.date}
          </div>
        </div>
        {/* Treatment Badge */}
        <Badge
          variant="outline"
          className="absolute top-4 right-4 text-xs border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400"
        >
          {review.treatment}
        </Badge>
      </CardContent>
    </Card>
  )
}

export default function PatientReviews() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Combine all reviews for a single marquee row
  const allReviews = [...patientReviews]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden animate-slide-in-from-bottom">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse dark:bg-blue-800/10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-indigo-800/10"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header */}
        <div
          className={`text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full px-6 py-2 mb-6">
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Patient Success Stories</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl mb-4">
            Real Patients,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Real Healing
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover how ClinicPro has transformed healthcare experiences and helped thousands of patients achieve
            better health outcomes through coordinated, comprehensive care.
          </p>
          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">98%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Patient Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Lives Improved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.9★</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
      {/* Single Marquee Row */}
      <div
        className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        <div className="relative flex overflow-hidden">
          <div className="flex space-x-6 animate-marquee-slow group-hover:animation-paused">
            {[...allReviews, ...allReviews].map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>
      {/* Custom CSS for Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes slide-in-from-bottom {
          0% {
            transform: translateY(100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-marquee-slow {
          animation: marquee 80s linear infinite; /* Increased duration for slower speed */
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 80s linear infinite; /* Increased duration for slower speed */
        }
        .animate-slide-in-from-bottom {
          animation: slide-in-from-bottom 1s ease-out forwards;
        }
        /* Pause animation on hover */
        .group-hover\:animation-paused:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
