import axios from "axios";
import { imagesSlice, IImages } from "../slice/imagesSlice";
import { AppDispatch } from "../store";
import { authorsSlice, IAuthors } from "../slice/authorsSlice";
import { locationsSlice, ILocations } from "../slice/locationsSlice";

interface IFetchImages{
  page?: number
  limit?: number
  field?: string
}

export const fetchImages = ({page, limit, field}: IFetchImages) => async (dispatch: AppDispatch) => {
    try {
      dispatch(imagesSlice.actions.imagesFatching());
      const response = await axios.get<IImages[]>(
        "https://test-front.framework.team/paintings",
        {
          params: {
            _page: page,
            _limit: limit,
            q: field
          },
        }
      );
      dispatch(imagesSlice.actions.imagesFatchingSuccess(response.data));
      dispatch(imagesSlice.actions.countFatching(response.headers?.['x-total-count']))
    } catch (e: any) {
      dispatch(imagesSlice.actions.imagesFatchingError(e.message));
    }
  };

export const fetchAuthors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authorsSlice.actions.authorsFatching());
    const response = await axios.get<IAuthors[]>(
      "https://test-front.framework.team/authors"
    );
    dispatch(authorsSlice.actions.authorsFatchingSuccess(response.data));
  } catch (e: any) {
    dispatch(authorsSlice.actions.authorsFatchingError(e.message));
  }
};

export const fetchLocations = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(locationsSlice.actions.locationsFatching());
    const response = await axios.get<ILocations[]>(
      "https://test-front.framework.team/locations"
    );
    dispatch(locationsSlice.actions.locationsFatchingSuccess(response.data));
  } catch (e: any) {
    dispatch(locationsSlice.actions.locationsFatchingError(e.message));
  }
};
