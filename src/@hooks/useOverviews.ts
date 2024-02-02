import {getOverviewItems, OverviewItem} from "../firebaseConfig";
import {useEffect, useState} from "react";


const OVERVIEW_KEY = 'dotSafariAgendaOverview'
export const useOverviewItems = (): [OverviewItem[], boolean, Error] => {
  const [overviewItems, setOverviewItems] = useState<OverviewItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function fetchOverviewItems() {
      setIsLoading(true);
      try {
        const items = await getOverviewItems();
        setOverviewItems(items);
        localStorage.setItem(OVERVIEW_KEY, JSON.stringify(items))
        setIsLoading(false);
        setError(undefined);
      } catch (e) {
        console.error(e)
        const overviewList = localStorage.getItem(OVERVIEW_KEY)
        if (overviewList) setOverviewItems(JSON.parse(overviewList))
        setIsLoading(false);
        setError(e);
      }
    }

    fetchOverviewItems();
  }, []);

  return [overviewItems, isLoading, error];
};