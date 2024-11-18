import { Lamp } from "@/components/ui/lamp";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Lamp />
      <main className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8">
        
        
        <div className="w-full mb-12">
          <Image 
            src="https://cdn.dribbble.com/users/1963775/screenshots/15815620/media/49625846d08bd1e820a3d03164ffd740.jpg?resize=1000x750&vertical=center"
            alt="Development Roadmap" 
            width={1000} 
            height={750}
            priority
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-bold mb-8">Development Roadmap</h2>
          
          <ul className="mb-12">
            <li className="mb-6">Dashboard</li>
            <li className="mb-6">Landing Page</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-6">Send/Receive Money Features</h3>
          <ul className="space-y-6">
            <li className="mb-4">User Flow Implementation
              <ul className="list-disc ml-6 mt-2 text-left">
                <li className="mb-2">Sending: Contact selection, amount entry, confirmation</li>
                <li className="mb-2">Receiving: Notifications, accept/decline functionality</li>
              </ul>
            </li>
            <li className="mb-4">UI Components
              <ul className="list-disc ml-6 mt-2 text-left">
                <li className="mb-2">Recipient selector with search</li>
                <li className="mb-2">Numeric keypad for amount entry</li>
                <li className="mb-2">Transaction confirmation modal</li>
              </ul>
            </li>
            <li className="mb-4">UX Enhancements
              <ul className="list-disc ml-6 mt-2 text-left">
                <li className="mb-2">Loading animations</li>
                <li className="mb-2">Error handling</li>
                <li className="mb-2">Security confirmations</li>
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
