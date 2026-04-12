export default function Contact() {
  return (
    <div className="px-6 md:px-16 py-10 space-y-12">

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg">
          Have questions or suggestions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">📧 Email</h2>
            <p className="text-gray-600">support@krishiroute.com</p>
            <p className="text-gray-600">team@krishiroute.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">📞 Phone</h2>
            <p className="text-gray-600">+91 9876xxxxxx</p>
            <p className="text-gray-600">+91 9123xxxxxx</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">📍 Location</h2>
            <p className="text-gray-600">
              India — Supporting farmers nationwide 🌾
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Send us a message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}