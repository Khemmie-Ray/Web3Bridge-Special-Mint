import { useQuery } from "@tanstack/react-query";
import { readOnlyProvider } from "../constants/providers";
import { getAnniversaryContract } from "../constants/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useMintStatus = () => {
  const { address } = useWeb3ModalAccount();
  
  const fetchEvents = async () => {
    const contract = getAnniversaryContract(readOnlyProvider);
    const deploymentBlockNumber = 14542345;

    const filter = contract.filters.MintSuccesful();
    const events = await contract.queryFilter(
      filter,
      deploymentBlockNumber,
      "latest"
    );

    return events.map((event) => ({
        address: event.args[0],
        id: Number(event.args[1]),
      }));
    }

  const { data: nftLogs = [], isLoading, error } = useQuery({
    queryKey: ["mintEvents", address],
    queryFn: fetchEvents,
    enabled: !!address, 
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });

  return { nftLogs, isLoading, error };
};

export default useMintStatus;
