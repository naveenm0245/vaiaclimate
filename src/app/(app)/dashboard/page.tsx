
import SignIn from "@/components/auth/SignIn";
import Example from "@/components/dashboard/Areachart";
import { BarChartHero } from "@/components/dashboard/Barchart";
import { CategoryBarHero } from "@/components/dashboard/CategoryBar";
import { ProgressCircleHero } from "@/components/dashboard/ProgressBar";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="space-y-4">
      {/* {session ? (
        <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <SignIn /> */}
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
        <Example />
        <div className="flex flex-col space-y-8">
          <ProgressCircleHero />
          <CategoryBarHero/>
        </div>
      </div>
      <BarChartHero />
    </main>
  );
}
