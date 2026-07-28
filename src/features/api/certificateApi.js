import { baseApi } from './baseApi';
import { endpoints } from '../../config/api/httpEndpoint';
import { unwrapApiData, transformErrorResponse } from './utils';

const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    downloadCertificate: builder.mutation({
      query: (certificateId) => ({
        url: endpoints.certificate.DOWNLOAD(certificateId),
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
    }),
  }),
});

export const { useDownloadCertificateMutation } = certificateApi;

export default certificateApi;
