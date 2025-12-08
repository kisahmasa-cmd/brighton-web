import { SearchX } from "lucide-react";
import {getMessage} from "../../../utils/message";
import {JSX} from "react";

interface NotFoundProps {
  type?: string;
  code?: number;
}

export default function NotFound({ type, code }: NotFoundProps): JSX.Element {
  const message = getMessage(type, code);
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <SearchX className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {message?.Title}
      </h3>
      <p className="text-gray-600 text-center max-w-md">
        {message?.Description}
      </p>
    </div>
  );
}