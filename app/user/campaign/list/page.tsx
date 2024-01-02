import Tile from "@/app/components/element/Tile";
import { getCampaigns } from "@/services/neon/db";
import { Campaign } from "@/services/neon/types";

const CampaignsPage = async () => {
  const { campaigns } = await getCampaigns();

  return (
    <div>
      <h1>Campaigns</h1>

      <div>
        {campaigns.length > 0 ? (
          <div className="flex flex-col items-center">
            {campaigns.map((c) => (
              <Tile key={c.id}>
                <div>
                  <div>Name: {c.name}</div>
                  <div>Description: {c.description}</div>
                  <div>Players: {c.players || "None"}</div>
                </div>
              </Tile>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
