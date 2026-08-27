import { ArrowLeft, UsersRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../components/ui/Utilities/Loading';
import { useGetTicketByIdQuery } from '../../../../features/api/ticketApi';
import { mapTicketPriorityLabel, formatTicketDisplayId } from '../../../../features/api/ticketMappers';
import { getRtkErrorMessage } from '../../../../features/api/utils';
import { ROUTES } from '../../../../config/routes';

const CompanyTicketDetailView = () => {
  const { t } = useTranslation();
  const { ticketId } = useParams();
  const { data: ticket, isLoading, isError, error } = useGetTicketByIdQuery(ticketId, {
    skip: !ticketId,
  });

  const ticketDisplayId = formatTicketDisplayId(ticket);

  return (
    <section className="space-y-6">
      <Link
        to={ROUTES.COMPANY_ADMIN.TICKETS}
        className="inline-flex text-[#2c2c2c]"
      >
        <ArrowLeft size={20} />
      </Link>

      <h2 className="text-[40px] font-semibold text-[#1f1f1f]">{t('companyAdmin.tickets.areaLabel')}</h2>


      {isLoading ? (
        <Loading size="md" className="min-h-40" />
      ) : isError ? (
        <p className="text-sm text-red-600">{getRtkErrorMessage(error)}</p>
      ) : !ticket ? (
        <p className="text-sm text-[#7a7a7a]">{t('companyAdmin.tickets.notFound')}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
            <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
              <h3 className="mb-4 text-[30px] font-semibold text-[#1f1f1f]">
                {t('companyAdmin.tickets.detail.descriptionTitle')}
              </h3>
              <div className="space-y-4 whitespace-pre-wrap text-sm text-[#3e3e3e]">
                {ticket.message || t('companyAdmin.tickets.detail.noDescription')}
              </div>
            </article>

            <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
              <h3 className="mb-4 text-[30px] font-semibold text-[#1f1f1f]">
                {t('companyAdmin.tickets.detail.detailsTitle')}
              </h3>
              <div className="space-y-2 text-sm text-[#3f3f3f]">
                <p>
                  <span className="font-semibold">{t('companyAdmin.tickets.detail.fields.id')}</span> {ticketDisplayId}
                </p>
                <p>
                  <span className="font-semibold">{t('companyAdmin.tickets.detail.fields.subject')}</span> {ticket.subject}
                </p>
                <p>
                  <span className="font-semibold">{t('companyAdmin.tickets.detail.fields.requesterType')}</span>{' '}
                  {ticket.userLevelLabel}
                </p>
                <p>
                  <span className="font-semibold">{t('companyAdmin.tickets.detail.fields.priority')}</span>{' '}
                  {mapTicketPriorityLabel(ticket.priority)}
                </p>
                <p>
                  <span className="font-semibold">{t('companyAdmin.tickets.detail.fields.createdAt')}</span>{' '}
                  {ticket.createdAtFormatted}
                </p>
                <p>
                  <span className="font-semibold">{t('companyAdmin.tickets.detail.fields.name')}</span> {ticket.userName}
                </p>
                <p>
                  <span className="font-semibold">{t('companyAdmin.tickets.detail.fields.status')}</span> {ticket.status}
                </p>
              </div>
            </article>
          </div>

          {ticket.answer ? (
            <article className="rounded-xl border border-[#e8e8e8] bg-white p-5">
              <h3 className="mb-5 border-b border-[#ececec] pb-4 text-[32px] font-semibold text-[#1f1f1f]">
                {t('companyAdmin.tickets.detail.conversationTitle')}
              </h3>
              <p className="mb-4 text-sm text-[#757575]">
                {t('companyAdmin.tickets.detail.updateLabel')} {ticket.updatedAtFormatted}
              </p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#2b2b2b]">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                      <UsersRound size={14} />
                    </span>
                    {t('companyAdmin.tickets.detail.supportLabel')}
                  </p>
                  <p className="text-sm text-[#8f8f8f]">{ticket.updatedAtFormatted}</p>
                  <div className="max-w-[630px] rounded-md bg-[#edf5f2] p-3 text-sm text-[#4e4e4e]">
                    {ticket.answer}
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </>
      )}
    </section>
  );
};

export default CompanyTicketDetailView;
