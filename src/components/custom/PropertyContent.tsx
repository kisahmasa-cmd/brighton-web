import React from "react";
import {Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {Badge} from "@/components/ui/badge";
import {CheckCircle, HeartHandshake, ShieldCheck, X} from "lucide-react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Button} from "@/components/ui/button";

interface PropertyContentProps {
  content: string;
}

const PropertyContent = ({ content }: PropertyContentProps) => {
  return (
    <div className="w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <Badge className="bg-primary text-yellow-800 hover:bg-yellow-300 transition-colors duration-500 mb-2 px-3 py-1 text-sm font-medium cursor-pointer">
            <CheckCircle className="!size-4" />
            Official Developer Partner
          </Badge>
        </DrawerTrigger>
        <DrawerContent>
          <VisuallyHidden>
            <DrawerTitle>Hidden Title for Accessibility</DrawerTitle>
          </VisuallyHidden>
          <div className="px-4 pb-2 lg:px-6 lg:pb-6">
            <div className="flex flex-row items-center justify-between pb-4">
              <h5 className="font-bold">
                {"Official Developer\'s Partner"}
              </h5>
              <DrawerClose asChild>
                <Button variant="ghost">
                  <X className="w-5 h-5"/>
                </Button>
              </DrawerClose>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex flex-row items-center gap-4">
                <HeartHandshake className="w-10 h-10"/>
                <p className="font-medium flex-1">
                  {"Brighton Real Estate sebagai partner pemasaran resmi"}
                </p>
              </div>
              <hr className="border border-gray-200 w-full"/>
              <div className="flex flex-row items-center gap-4">
                <ShieldCheck className="w-10 h-10"/>
                <p className="font-medium flex-1">
                  {"Harga terbaik dan informasi langsung dari developer"}
                </p>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <h2 className="text-xl font-bold mb-2 text-gray-900">Tentang Properti</h2>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        itemProp="articleBody"
        className="[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-black
                   [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:text-black
                   [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-black
                   [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mt-8 [&_h4]:mb-4 [&_h4]:text-black
                   [&_h5]:text-base [&_h5]:font-bold [&_h5]:mt-6 [&_h5]:mb-3 [&_h5]:text-black
                   [&_h6]:text-sm [&_h6]:font-bold [&_h6]:mt-5 [&_h6]:mb-2 [&_h6]:text-black
                   [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-black [&_p]:text-justify
                   [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                   [&_strong]:font-bold
                   [&_ul]:list-disc [&_ul]:mb-4
                   [&_ol]:list-decimal [&_ol]:mb-4
                   [&_li]:text-base [&_li]:mb-2 [&_li]:text-black
                   [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4
                   prose prose-lg max-w-none text-gray-700"
      />
    </div>
  );
};

export default PropertyContent;