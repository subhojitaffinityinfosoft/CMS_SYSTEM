import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollege } from 'shared-core';
import { Card, CardHeader, CardTitle, CardContent } from 'shared-ui';

const mockColleges = [
  { id: 1, name: "ABC College", code: "ABC", location: "Kolkata" },
  { id: 2, name: "XYZ College", code: "XYZ", location: "Howrah" }
];

export default function CollegeSelection() {
  const { setSelectedCollege } = useCollege();
  const navigate = useNavigate();

  const handleSelect = (college) => {
    setSelectedCollege(college);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome to CMS ERP</h1>
        <p className="text-muted-foreground text-lg">Please select a college to continue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {mockColleges.map(college => (
          <Card 
            key={college.id} 
            className="cursor-pointer hover:shadow-lg hover:border-primary transition-all group"
            onClick={() => handleSelect(college)}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-xl font-bold text-primary">{college.code}</span>
              </div>
              <CardTitle className="text-2xl">{college.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              {college.location}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
