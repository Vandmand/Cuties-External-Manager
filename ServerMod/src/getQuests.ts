import { QuestHelper } from "@spt/helpers/QuestHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { SerializableError } from "@spt/custom/SerializableError";
import { LocaleService } from "@spt/services/LocaleService";
import { ILogger } from "@spt/models/spt/utils/ILogger";

const questFaction = (questConfig: any, questId: string): string => {
  if (questConfig.bearOnlyQuests.includes(questId)) {
    return "Bear";
  }

  if (questConfig.usecOnlyQuests.includes(questId)) {
    return "Usec";
  }

  return "All";
};

export const getQuests = (
  questHelper: QuestHelper,
  profileHelper: ProfileHelper,
  questConfig: unknown,
  sessionID: string
): IQuest[] | SerializableError => {
  const allQuests = questHelper.getQuestsFromDb();
  const pmcData = profileHelper.getPmcProfile(sessionID);

  if (!pmcData) return { Error: "No sessionID provided" };

  const questFilter = (quest: IQuest): boolean => {
    const factionSide = questFaction(questConfig, quest._id);
    return factionSide === pmcData.Info.Side || factionSide === "All";
  };

  const modifiedQuests = allQuests.filter(questFilter);

  return modifiedQuests;
};
