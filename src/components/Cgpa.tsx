import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card} from "./ui/card";
import { motion } from "framer-motion";

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
];

const CGPACalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sgpaData, setSgpaData] = useState<string[]>(Array(semesters.length).fill(""));

  const handleInputChange = (value: string) => {
    const updatedData = [...sgpaData];
    updatedData[currentStep] = value;
    setSgpaData(updatedData);
  };

  const handleNext = () => {
    if (currentStep < semesters.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("SGPA Data:", sgpaData);
      // You can add your CGPA calculation logic here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-2xl p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">CGPA Calculator</h1>
          <p className="text-lg text-gray-600 mb-6">Enter your SGPA for {semesters[currentStep]}</p>

          <Input
            type="number"
            placeholder="e.g., 8.5"
            value={sgpaData[currentStep]}
            onChange={(e) => handleInputChange(e.target.value)}
            className="text-center text-lg"
          />

          <Button
            onClick={handleNext}
            className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white text-lg rounded-xl w-full py-3"
          >
            {currentStep < semesters.length - 1 ? "Next" : "Finish"}
          </Button>

          <div className="mt-4 text-sm text-gray-500">
            Step {currentStep + 1} of {semesters.length}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default CGPACalculator;
