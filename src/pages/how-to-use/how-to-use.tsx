import Footer from "../home/components/footer";

const HowToUse = () => {
  return (
    <>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">How to get search URL</h1>

      <div className="space-y-6">
        <p>Go to <a href="https://onlineksrtcswift.com/" className="text-blue-500 hover:underline">onlineksrtcswift.com</a> and select journy date, route and copy the url</p>
      </div>

      {/* Video section - Add when proper video is available */}
      <div className="mt-8 flex justify-center items-center flex-col">
        <h2 className="text-2xl font-semibold mb-4">Tutorial Video</h2>
        <div className="aspect-w-16 aspect-h-9">
          <video src="https://res.cloudinary.com/dpqpclkby/video/upload/v1742915469/bus-project/demo-ksrtc-notification-app_iqtx6f.mp4" muted autoPlay loop controls />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default HowToUse;
