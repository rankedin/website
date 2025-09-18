"use client"

import {
  BarChart3,
  Check,
  Cookie,
  Palette,
  Settings,
  Shield,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import CookieConsent from "react-cookie-consent"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  preferences: boolean
}

export function CookieConsentBanner() {
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    analytics: false,
    preferences: false,
  })

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      preferences: true,
    })
  }

  const handleRejectAll = () => {
    setPreferences({
      essential: true,
      analytics: false,
      preferences: false,
    })
  }

  const handleSavePreferences = () => {
    // Save preferences to localStorage
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences))
    setShowDetails(false)
  }

  if (showDetails) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Cookie className="h-6 w-6 mr-2 text-orange-500" />
                <h2 className="text-xl font-bold">Cookie Preferences</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-muted-foreground mb-6">
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. Choose which cookies you'd like
              to accept.
            </p>

            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    <h3 className="font-semibold">Essential Cookies</h3>
                    <Badge variant="secondary" className="ml-2">
                      Required
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Necessary for the website to function properly. These cannot
                    be disabled.
                  </p>
                </div>
                <div className="ml-4">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                    <h3 className="font-semibold">Analytics Cookies</h3>
                    <Badge variant="outline" className="ml-2">
                      Optional
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website by
                    collecting information anonymously.
                  </p>
                </div>
                <div className="ml-4">
                  <Button
                    variant={preferences.analytics ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: !prev.analytics,
                      }))
                    }
                  >
                    {preferences.analytics ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Preference Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Palette className="h-4 w-4 mr-2 text-purple-500" />
                    <h3 className="font-semibold">Preference Cookies</h3>
                    <Badge variant="outline" className="ml-2">
                      Optional
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Remember your preferences and settings to provide a
                    personalized experience.
                  </p>
                </div>
                <div className="ml-4">
                  <Button
                    variant={preferences.preferences ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        preferences: !prev.preferences,
                      }))
                    }
                  >
                    {preferences.preferences ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleSavePreferences} className="flex-1">
                Save Preferences
              </Button>
              <Button
                variant="outline"
                onClick={handleAcceptAll}
                className="flex-1"
              >
                Accept All
              </Button>
              <Button
                variant="ghost"
                onClick={handleRejectAll}
                className="flex-1"
              >
                Reject All
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                For more information, read our{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-foreground"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Reject All"
      enableDeclineButton
      onAccept={handleAcceptAll}
      onDecline={handleRejectAll}
      cookieName="rankedin-cookie-consent"
      style={{
        background: "#000000",
        border: "1px solid #333333",
        borderRadius: "8px",
        margin: "16px",
        padding: "12px",
        fontSize: "14px",
        color: "#ffffff",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        maxWidth: "1000px",
        width: "calc(100vw - 32px)",
        left: "50%",
        transform: "translateX(-50%)",
        position: "fixed",
        bottom: "16px",
      }}
      buttonStyle={{
        background: "#ffffff",
        color: "#000000",
        fontSize: "14px",
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginRight: "8px",
        fontWeight: "500",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#ffffff",
        fontSize: "14px",
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #666666",
        cursor: "pointer",
        marginRight: "8px",
        fontWeight: "500",
      }}
      expires={365}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">We use cookies</h3>
            <p className="text-sm" style={{ color: "#cccccc" }}>
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. By clicking "Accept All", you
              consent to our use of cookies.
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(true)}
          className="flex-shrink-0"
        >
          <Settings className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </div>
    </CookieConsent>
  )
}
