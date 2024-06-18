const ExercisePage = ({
  params: { id, exerciseId },
}: {
  params: { id: string; exerciseId: string };
}) => {
  return (
    <div>
      <div>Workout {id}</div>
      <div>Exercise {exerciseId}</div>
    </div>
  );
};

export default ExercisePage;
