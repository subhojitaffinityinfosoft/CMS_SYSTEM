import { Card, CardContent } from "@/components/ui/card"

export default function CourseCard({ title, image }) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-md">
      <img
        src={image}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h4 className="text-lg font-semibold">{title}</h4>
      </CardContent>
    </Card>
  )
}