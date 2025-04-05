import TvSeries, { ITvSeries } from '../models/tvseries-model';

export const getAll = async (): Promise<ITvSeries[]> => {
  return await TvSeries.find();
};

export const getByCategory = async (category: string): Promise<ITvSeries[]> => {
  return await TvSeries.find({ category });
};

export const getById = async (id: number): Promise<ITvSeries | null> => {
  return await TvSeries.findOne({ id });
};

export const create = async (data: ITvSeries): Promise<ITvSeries> => {
  const newSeries = new TvSeries(data);
  return await newSeries.save();
};

export const update = async (id: number, data: Partial<ITvSeries>): Promise<ITvSeries | null> => {
  return await TvSeries.findOneAndUpdate({ id }, data, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id: number): Promise<{ deletedCount?: number }> => {
  return await TvSeries.deleteOne({ id });
};
