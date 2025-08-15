import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios"; 

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAxios<T = unknown>(
  config: AxiosRequestConfig,
  dependencies: any[] = []
): UseAxiosResult<T> {
    
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axios(config)
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      })
      .catch((err: AxiosError) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}
