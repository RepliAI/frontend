import { PlanFeatures } from "@/types"

interface PlanFeatureProps {
    feature: PlanFeatures
}

export default function PlanFeature({ feature }: PlanFeatureProps) {
    return (
        <li className="flex items-center gap-2 text-sm text-gray-700">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${feature.included ? "bg-green-100 border-green-300 text-green-700" : "bg-gray-100 border-gray-300 text-gray-400"}`}>
                {feature.included ? "✓" : "✕"}
            </span>
            <span className={!feature.included ? "text-gray-400" : ""}>
                {feature.label}
            </span>
        </li>
    )
}