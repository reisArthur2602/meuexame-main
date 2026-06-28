import { getExams } from "../actions/get-exams";
import { ExamsTable } from "./exams-table";

export const ExamsData = async () => {
  const data = await getExams();
  return <ExamsTable data={data} />;
};
