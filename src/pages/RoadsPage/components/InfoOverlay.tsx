import { ReactElement } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import SkdfIcon from '../../../components/SkdfIcon';
import { formatNumber } from '../../../utils';

type InfoOverlayProps = {
  stat: {
    backboneLength: number;
    fedCount: number;
    fedLength: number;
    locCount: number;
    locLength: number;
    regCount: number;
    regLength: number;
    roadCheckedCount: number;
    totalCount: number;
    totalLength: number;
  };
  children: ReactElement;
};

function InfoOverlay({ stat, children }: InfoOverlayProps) {
  const { fedCount, fedLength, locCount, locLength, regCount, regLength, backboneLength } = stat;
  const infoWithIconCls = 'd-flex align-items-center gap-2';
  const toFixedFloat = (n: number) => parseFloat(n.toFixed(2));

  return (
    <OverlayTrigger
      placement="bottom"
      trigger="click"
      rootClose
      popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] }}
      overlay={
        <Popover className="skdf-popover-lg">
          <Popover.Body className="py-3">
            <table className="table table-borderless mb-0">
              <thead>
                <tr>
                  <th style={{ width: '18rem' }}></th>
                  <th className="fw-normal text-sm text-caption">Количество, шт</th>
                  <th className="fw-normal text-sm text-caption">Протяжённость, км</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td className={infoWithIconCls}>
                    <SkdfIcon name="road" className="text-primary" />
                    Всего:
                  </td>
                  <td className="text-end">{formatNumber(totalCount)}</td>
                  <td className="text-end">{formatNumber(toFixedFloat(totalLength))}</td>
                </tr> */}
                <tr>
                  <td className={infoWithIconCls}>
                    <SkdfIcon name="federal" className="text-primary" />
                    Федеральные
                  </td>
                  <td className="text-end">{formatNumber(fedCount)}</td>
                  <td className="text-end">{formatNumber(toFixedFloat(fedLength))}</td>
                </tr>
                <tr>
                  <td className={infoWithIconCls}>
                    <SkdfIcon name="regional" className="text-primary" />
                    Региональные
                  </td>
                  <td className="text-end">{formatNumber(regCount)}</td>
                  <td className="text-end">{formatNumber(toFixedFloat(regLength))}</td>
                </tr>
                <tr>
                  <td className={infoWithIconCls}>
                    <SkdfIcon name="local" className="text-primary" />
                    Местные
                  </td>
                  <td className="text-end">{formatNumber(locCount)}</td>
                  <td className="text-end">{formatNumber(toFixedFloat(locLength))}</td>
                </tr>
                <tr>
                  <td className={infoWithIconCls}>
                    <SkdfIcon name="road" className="text-primary" />
                    Опорная сеть
                  </td>
                  <td></td>
                  <td className="text-end">{formatNumber(toFixedFloat(backboneLength))}</td>
                </tr>
              </tbody>
            </table>
          </Popover.Body>
        </Popover>
      }
    >
      {children}
    </OverlayTrigger>
  );
}

export default InfoOverlay;
