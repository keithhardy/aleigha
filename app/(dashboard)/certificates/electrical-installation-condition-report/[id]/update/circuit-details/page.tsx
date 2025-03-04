import { Header, HeaderGroup, Heading } from '@/components/page-header';
import { ScheduleOfCircuitDetailsForm } from './form'

export default function ScheduleOfCircuitDetails() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Schedule Of Circuit Details</Heading>
        </HeaderGroup>
      </Header>

      <ScheduleOfCircuitDetailsForm />
    </div>
  );
}
