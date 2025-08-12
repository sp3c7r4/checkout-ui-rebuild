import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Globe, Users, FileText, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RagSourcesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RagSourcesModal({ isOpen, onClose }: RagSourcesModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("website")
  
  const [formData, setFormData] = useState({
    websiteUrl: "",
    socialUrls: {
      twitter: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      youtube: ""
    },
    customData: "",
    title: "",
    description: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)

    // Show success toast
    toast.success("RAG updated successfully", "Your data source has been processed and is ready for use.")

    // Reset form and close modal
    setFormData({
      websiteUrl: "",
      socialUrls: {
        twitter: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        youtube: ""
      },
      customData: "",
      title: "",
      description: ""
    })
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSocialInputChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialUrls: {
        ...prev.socialUrls,
        [platform]: value
      }
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            Add RAG Sources
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Social
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Custom Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="website" className="space-y-4">
              <div>
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the URL of the website you want to scrape for RAG data
                </p>
              </div>

              <div>
                <Label htmlFor="title">Source Title</Label>
                <Input
                  id="title"
                  placeholder="My Website Data"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this data source..."
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter">Twitter/X Profile</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/username"
                    value={formData.socialUrls.twitter}
                    onChange={(e) => handleSocialInputChange("twitter", e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.socialUrls.linkedin}
                    onChange={(e) => handleSocialInputChange("linkedin", e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="facebook">Facebook Page</Label>
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/page"
                    value={formData.socialUrls.facebook}
                    onChange={(e) => handleSocialInputChange("facebook", e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram">Instagram Profile</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/username"
                    value={formData.socialUrls.instagram}
                    onChange={(e) => handleSocialInputChange("instagram", e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="youtube">YouTube Channel</Label>
                  <Input
                    id="youtube"
                    placeholder="https://youtube.com/@channel"
                    value={formData.socialUrls.youtube}
                    onChange={(e) => handleSocialInputChange("youtube", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Add social media URLs to extract content for RAG processing
              </p>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div>
                <Label htmlFor="customData">Custom Data (Markdown)</Label>
                <Textarea
                  id="customData"
                  placeholder="# Your Custom Data

## Overview
Add your custom markdown content here...

- Key point 1
- Key point 2
- Key point 3

**Important:** This data will be processed for RAG generation."
                  value={formData.customData}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("customData", e.target.value)}
                  className="mt-2 font-mono"
                  rows={12}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Write or paste your custom data in Markdown format
                </p>
              </div>

              <div>
                <Label htmlFor="customTitle">Data Title</Label>
                <Input
                  id="customTitle"
                  placeholder="My Custom Dataset"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                "Add RAG Source"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
