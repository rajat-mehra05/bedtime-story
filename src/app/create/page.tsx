import StepForm from '@/components/StepForm';
import NightSky from '@/components/NightSky';

const CreatePage = () => {
  return (
    <div className="relative">
      <NightSky />
      <div className="relative z-10">
        <StepForm />
      </div>
    </div>
  );
};

export default CreatePage;

