import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-text-dark mb-3">
            Visit Us
          </h2>
          <div className="section-divider">
            <span className="text-gold-light text-lg">&#10045;</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-text-dark mb-1 text-base">
                  Address
                </h3>
                <p className="text-text-muted">
                  146 Prince Street
                  <br />
                  Charlottetown, PEI, C1A4R6
                  <br />
                  <span className="text-sm text-text-muted/70">
                    Corner of Prince and Grafton St
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                <FaPhone className="text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-text-dark mb-1 text-base">
                  Phone
                </h3>
                <a
                  href="tel:9023306261"
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  902-330-6261
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                <FaEnvelope className="text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-text-dark mb-1 text-base">
                  Email
                </h3>
                <a
                  href="mailto:gracynailsbeauty@gmail.com"
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  gracynailsbeauty@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                <FaClock className="text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-text-dark mb-1 text-base">
                  Hours
                </h3>
                <p className="text-text-muted">
                  Monday – Saturday: 9:00 AM – 7:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=100090193345540"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-light/50 hover:bg-blue-light text-text-dark w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.instagram.com/gracynailsbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-light/50 hover:bg-blue-light text-text-dark w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden shadow-elegant h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.5!2d-63.1311!3d46.2352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5e52c4b1a1a0a5%3A0x0!2s146+Prince+St%2C+Charlottetown%2C+PE!5e0!3m2!1sen!2sca!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gracy Nails location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
