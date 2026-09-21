
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

const page = () => {
  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="bg-amber-50 py-4 px-10 rounded-lg flex items-center justify-between mb-10">
        <div>
          <h2 className="text-sm font-semibold text-orange-400">GET IN TOUCH</h2>
          <h1 className="font-bold text-2xl">Contact Us</h1>
        </div>
        <p className="text-sm text-gray-500">Home &gt; Contact</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 px-4 mb-16">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Phone className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-sm text-gray-500">+20 100 123 4567</p>
              <p className="text-sm text-gray-500">9 AM - 10 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <p className="text-sm text-gray-500">support@clickshop.com</p>
              <p className="text-sm text-gray-500">We &apos; ll reply within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Visit Us</h3>
              <p className="text-sm text-gray-500">Cairo, Egypt</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Working Hours</h3>
              <p className="text-sm text-gray-500">Sat - Thu: 9 AM - 10 PM</p>
              <p className="text-sm text-gray-500">	Friday: 2 PM - 10 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-gray-100 rounded-lg p-6">
          <h2 className="font-bold text-xl mb-1">Send Us a Message</h2>
          <p className="text-sm text-gray-500 mb-6">
            	We&apos;ll get back to you as soon as possible
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default page
