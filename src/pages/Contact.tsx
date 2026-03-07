import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/shared/ContactForm";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to start your real estate journey? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: "Address", value: "B-9, Ansals Sampark-1\nSCO-194-195, City Centre\nSector-5, Panchkula\nHaryana – 134109" },
              { icon: Phone, label: "Phone", value: "+91 90564 65106\n+1 236-258-5106" },
              { icon: Mail, label: "Email", value: "kngestate@gmail.com" },
              { icon: Clock, label: "Hours", value: "Mon–Fri: 9 AM – 6 PM\nSat: 10 AM – 4 PM" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-4xl p-6 shadow-premium border border-border/50 flex items-start gap-4"
              >
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-1">{item.label}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Contact;
