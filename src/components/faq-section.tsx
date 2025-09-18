"use client"

import { Disclosure, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { ChevronDownIcon } from "lucide-react"
import { Fragment } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FAQSection() {
  const faqs = [
    {
      question: "How are the rankings calculated?",
      answer:
        "Our rankings use a sophisticated algorithm that considers multiple factors including GitHub stars, forks, commit activity, contributor count, and community engagement. The algorithm is updated regularly to ensure accuracy and fairness.",
    },
    {
      question: "How often are rankings updated?",
      answer:
        "Rankings are updated in real-time as new data becomes available. Most metrics are refreshed every hour, while some deeper analytics are updated daily to ensure optimal performance.",
    },
    {
      question: "Can I contribute my own repositories or user profiles?",
      answer:
        "Absolutely! We encourage community contributions. You can submit repositories, user profiles, and topics through our contribution page. All submissions are verified before being added to the rankings.",
    },
    {
      question: "Is RankedIn free to use?",
      answer:
        "Yes, RankedIn is completely free for all users. We believe in open access to developer insights and community data. Premium features may be introduced in the future, but core functionality will always remain free.",
    },
    {
      question: "How do you ensure data accuracy?",
      answer:
        "We directly integrate with the GitHub API to fetch real-time data. Our validation systems check for anomalies and our community helps verify submissions. We also have automated systems to detect and filter spam or fake accounts.",
    },
    {
      question: "Can I export ranking data?",
      answer:
        "Currently, you can view and share rankings through our web interface. We're working on API access and export features for developers who want to integrate our data into their own applications.",
    },
    {
      question:
        "What makes RankedIn different from other GitHub analytics tools?",
      answer:
        "RankedIn focuses on comprehensive community-driven rankings with real-time updates, user-friendly interface, and detailed insights. We combine multiple data points to provide the most accurate picture of the GitHub ecosystem.",
    },
    {
      question: "Do you track private repositories?",
      answer:
        "No, we only track public repositories and publicly available user data. We respect privacy and only use information that is publicly accessible through GitHub's API.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about RankedIn and how it works
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={`faq-${faq.question.slice(0, 20)}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Disclosure>
                  {({ open }) => (
                    <Card
                      className={`transition-all duration-200 ${open ? "ring-2 ring-primary/20" : ""}`}
                    >
                      <Disclosure.Button className="w-full">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <h3 className="text-left font-semibold text-lg">
                              {faq.question}
                            </h3>
                            <ChevronDownIcon
                              className={`${
                                open ? "rotate-180" : ""
                              } h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4`}
                            />
                          </div>
                        </CardContent>
                      </Disclosure.Button>
                      <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="border-t">
                          <CardContent className="p-6 pt-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </CardContent>
                        </Disclosure.Panel>
                      </Transition>
                    </Card>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">
                  Still have questions?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Can't find the answer you're looking for? Our team is here to
                  help.
                </p>
                <Button>Contact Support</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
