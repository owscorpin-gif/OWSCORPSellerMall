import DeveloperProfile from '../DeveloperProfile';

export default function DeveloperProfileExample() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <DeveloperProfile
        onSave={(data) => console.log('Profile saved:', data)}
      />
    </div>
  );
}
