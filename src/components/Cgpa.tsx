import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

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
  const [sgpaData, setSgpaData] = useState<number[]>(
    Array(semesters.length).fill(NaN)
  );
  const [showResult, setShowResult] = useState(false);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const [width, height] = useWindowSize();
  const date = new Date();

  const handleInputChange = (value: string) => {
    const parsedValue = parseFloat(value);
    const updatedData = [...sgpaData];
    updatedData[currentStep] = isNaN(parsedValue) ? NaN : parsedValue;
    setSgpaData(updatedData);
  };

  const calculateCGPA = () => {
    const total = sgpaData.reduce((sum, num) => sum + num, 0);
    const result = total / semesters.length;
    setCgpa(result);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentStep < semesters.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateCGPA();
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSgpaData(Array(semesters.length).fill(NaN));
    setCgpa(null);
    setShowResult(false);
  };

  const getMessage = () => {
    if (cgpa === null) return "";

    if (cgpa >= 9)
      return "🎉 Fantabulous! You're setting the bar high. Keep it going!";
    if (cgpa >= 8)
      return "👏 🎉 Fantastic! Your hard work really shows. Keep up the amazing effort!";
    if (cgpa >= 7)
      return "😊 Great Job! Stay consistent and you'll climb further!";
    if (cgpa >= 6)
      return "🙂 🙂 Decent! You're walking the fine line between Netflix and textbooks";
    if (cgpa >= 5)
      return "😅 Surviving... but by the skin of your teeth! More books, less memes maybe?";
    return "😔 CGPA went on vacation... Time for a serious plot twist further down the road.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti only if CGPA is greater than 5 */}
      {showResult && cgpa !== null && cgpa > 5 && (
        <Confetti width={width} height={height} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-2xl p-6 text-center flex flex-col h-full">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              CGPA Calculator
            </h1>

            {!showResult ? (
              <>
                <p className="text-lg text-gray-600 mb-6">
                  Enter your SGPA for {semesters[currentStep]}
                </p>

                <Input
                  type="number"
                  placeholder="e.g., 8.5"
                  value={
                    isNaN(sgpaData[currentStep]) ? "" : sgpaData[currentStep]
                  }
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="text-center text-lg"
                />

                <Button
                  onClick={handleNext}
                  className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer text-lg rounded-xl w-full py-3"
                >
                  {currentStep < semesters.length - 1
                    ? "Next"
                    : "Calculate Your CGPA"}
                </Button>

                <div className="mt-4 text-sm text-gray-500">
                  Step {currentStep + 1} of {semesters.length}
                </div>
              </>
            ) : (
              <>
                <h2
                  className={`text-4xl font-bold mb-4 ${
                    cgpa! > 5 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Your CGPA: {cgpa!.toFixed(2)}
                </h2>

                <p className="text-lg text-gray-700 mb-4">{getMessage()}</p>

                {cgpa! <= 5 && (
                  <div className="text-3xl text-red-600 animate-bounce mb-4">
                    😢 Don't worry... Keep trying! Better results await!
                  </div>
                )}

                {/* Reset Button After Result */}
                <Button
                  onClick={handleReset}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white cursor-pointer text-lg rounded-xl w-full py-3"
                >
                  Reset
                </Button>
              </>
            )}
          </div>

          <footer className="mt-6 text-gray-500 text-sm">
            © {date.getFullYear()} Sarkhail. All Rights Reserved.
          </footer>
        </Card>
      </motion.div>
    </div>
  );
};

export default CGPACalculator;
