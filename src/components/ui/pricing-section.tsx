"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Sparkles, X, CreditCard, Shield, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'

interface Feature {
  name: string
  description: string
  included: boolean
}

interface PricingTier {
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: Feature[]
  highlight?: boolean
  badge?: string
  icon: React.ReactNode
}

interface PricingSectionProps {
  tiers: PricingTier[]
  className?: string
}

interface UpgradeFormData {
  fullName: string
  email: string
  company: string
  phone: string
  plan: string
  billingCycle: 'monthly' | 'yearly'
  paymentMethod: 'card' | 'paypal'
  specialRequests: string
}

function PricingSection({ tiers, className }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [showUpgradeForm, setShowUpgradeForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<UpgradeFormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    plan: '',
    billingCycle: 'monthly',
    paymentMethod: 'card',
    specialRequests: ''
  })

  const handleUpgradeClick = (tier: PricingTier) => {
    if (tier.price.monthly === 0) {
      // Free plan - redirect to signup
      window.location.href = '/signup'
    } else {
      // Pro plan - show upgrade form
      setSelectedPlan(tier)
      setFormData(prev => ({
        ...prev,
        plan: tier.name,
        billingCycle: isYearly ? 'yearly' : 'monthly'
      }))
      setShowUpgradeForm(true)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPlan) return

    setIsSubmitting(true)

    try {
      const upgradeRequest = {
        ...formData,
        planDetails: {
          name: selectedPlan.name,
          price: isYearly ? selectedPlan.price.yearly : selectedPlan.price.monthly,
          billingCycle: formData.billingCycle
        },
        totalAmount: isYearly ? selectedPlan.price.yearly : selectedPlan.price.monthly,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }

      await addDoc(collection(db, 'upgrade_requests'), upgradeRequest)
      
      toast.success('Upgrade request submitted successfully! We\'ll contact you within 24 hours.')
      setShowUpgradeForm(false)
      setFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        plan: '',
        billingCycle: 'monthly',
        paymentMethod: 'card',
        specialRequests: ''
      })
    } catch (error) {
      console.error('Error submitting upgrade request:', error)
      toast.error('Failed to submit upgrade request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof UpgradeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <section
        className={cn(
          "relative bg-gradient-to-br from-gray-50 via-white to-orange-50/30",
          "py-16 px-4 md:py-24 lg:py-32",
          "overflow-hidden",
          className,
        )}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6 mb-16">
            {/* Billing Toggle */}
            <div className="relative bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex items-center">
                {["Monthly", "Yearly"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setIsYearly(period === "Yearly")}
                    className={cn(
                      "relative px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300",
                      (period === "Yearly") === isYearly
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {(period === "Yearly") === isYearly && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg"></div>
                    )}
                    <span className="relative z-10">{period}</span>
                    {period === "Yearly" && (
                      <span className="relative z-10 ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Save 20%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={cn(
                  "relative group",
                  "rounded-3xl transition-all duration-500",
                  "flex flex-col", // Ensure full height
                  "hover:scale-[1.02] hover:-translate-y-2",
                  tier.highlight
                    ? "bg-gradient-to-br from-white via-orange-50/50 to-pink-50/50 shadow-2xl border-2 border-orange-200/50"
                    : "bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200/50",
                  "overflow-visible",
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Highlight glow effect */}
                {tier.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-3xl"></div>
                )}

                {/* Popular badge - Fixed positioning */}
                {tier.badge && tier.highlight && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg border-2 border-white">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-bold">{tier.badge}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Content - Flex grow to fill available space */}
                <div className="relative p-8 lg:p-10 flex-1 flex flex-col mt-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div
                        className={cn(
                          "p-4 rounded-2xl",
                          tier.highlight
                            ? "bg-gradient-to-br from-orange-100 to-pink-100"
                            : "bg-gray-100",
                        )}
                      >
                        {tier.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {tier.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {tier.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-5xl font-bold text-gray-900">
                        ₹{isYearly ? tier.price.yearly : tier.price.monthly}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">
                          /{isYearly ? "year" : "month"}
                        </span>
                        {isYearly && tier.price.monthly > 0 && (
                          <span className="text-xs text-green-600 font-medium">
                            Save ₹{(tier.price.monthly * 12) - tier.price.yearly}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {tier.price.monthly === 0 && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Forever Free
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features - Flex grow to push button to bottom */}
                  <div className="space-y-4 mb-8 flex-1">
                    {tier.features.slice(0, 6).map((feature) => (
                      <div key={feature.name} className="flex items-start space-x-3">
                        <div
                          className={cn(
                            "mt-0.5 p-1 rounded-full flex-shrink-0",
                            feature.included
                              ? tier.highlight
                                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                                : "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400",
                          )}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={cn(
                            "text-sm font-medium",
                            feature.included ? "text-gray-900" : "text-gray-400"
                          )}>
                            {feature.name}
                          </div>
                          <div className={cn(
                            "text-xs mt-0.5",
                            feature.included ? "text-gray-600" : "text-gray-400"
                          )}>
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {tier.features.length > 6 && (
                      <div className="text-center pt-2">
                        <span className="text-sm text-gray-500">
                          +{tier.features.length - 6} more features
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button Container - Fixed height for alignment */}
                  <div className="mt-auto">
                    <Button
                      onClick={() => handleUpgradeClick(tier)}
                      className={cn(
                        "w-full h-14 text-base font-semibold rounded-2xl transition-all duration-300",
                        "group relative overflow-hidden",
                        tier.highlight
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl",
                      )}
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>
                          {tier.price.monthly === 0 ? "Get Started Free" : "Upgrade to Pro"}
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      
                      {/* Button hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Button>

                    {/* Fixed height container for additional text - ensures both cards have same height */}
                    <div className="h-8 flex items-center justify-center mt-3">
                      {tier.price.monthly === 0 && (
                        <p className="text-center text-xs text-gray-500">
                          No credit card required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              Need something custom? We'd love to help you create the perfect plan.
            </p>
            <a
              href="mailto:admin@resumin.link"
              className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              <span>Contact us for enterprise solutions</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Upgrade Form Modal */}
      {showUpgradeForm && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Upgrade to {selectedPlan.name}</h3>
                    <p className="text-gray-600">
                      ₹{isYearly ? selectedPlan.price.yearly : selectedPlan.price.monthly}/{isYearly ? 'year' : 'month'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpgradeForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Personal Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Billing Options
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Cycle
                    </label>
                    <select
                      value={formData.billingCycle}
                      onChange={(e) => handleInputChange('billingCycle', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="monthly">Monthly (₹{selectedPlan.price.monthly}/month)</option>
                      <option value="yearly">Yearly (₹{selectedPlan.price.yearly}/year) - Save 20%</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Special Requests (Optional)
                </h4>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Any special requirements or questions..."
                />
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing:</span>
                    <span className="font-medium capitalize">{formData.billingCycle}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-orange-600">
                        ₹{formData.billingCycle === 'yearly' ? selectedPlan.price.yearly : selectedPlan.price.monthly}
                        /{formData.billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUpgradeForm(false)}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Submit Upgrade Request</span>
                    </>
                  )}
                </button>
              </div>

              {/* Disclaimer */}
              <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                <p>
                  🔒 Your information is secure and encrypted. We'll contact you within 24 hours to complete the upgrade process.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export { PricingSection }