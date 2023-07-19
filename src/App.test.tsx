import { getSkeletons } from "./components/Root";
import { Skeleton } from "@mui/material";

const skeletonsTest = [
  <Skeleton key={`skeleton-1`} animation="wave" height={50} />,
  <Skeleton key={`skeleton-2`} animation="wave" height={50} />,
  <Skeleton key={`skeleton-3`} animation="wave" height={50} />,
  <Skeleton key={`skeleton-4`} animation="wave" height={50} />,
  <Skeleton key={`skeleton-5`} animation="wave" height={50} />,
]

test('get skeletons during load', async () => {
  const elements = getSkeletons(5);
  expect(elements).toEqual(skeletonsTest);
});