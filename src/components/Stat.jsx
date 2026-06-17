import { useCountUp } from '../hooks/useCountUp';
import InfoTip from './InfoTip';

export default function Stat({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
  source,
  note,
}) {
  const [ref, display] = useCountUp(value, { decimals });

  return (
    <div className="stat">
      <div className="stat__value">
        <span ref={ref}>
          {prefix}
          {display}
        </span>
        {suffix && <span className="unit">{suffix}</span>}
        {(note || source) && (
          <InfoTip label="Voir la source du chiffre">
            {note ? (
              <>
                <strong>Estimation Reskope.</strong> {note}
              </>
            ) : (
              <>
                <strong>Source.</strong> {source.label}
                {source.url && (
                  <>
                    {' · '}
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      voir la source
                    </a>
                  </>
                )}
              </>
            )}
          </InfoTip>
        )}
      </div>
      <p className="stat__label">{label}</p>
    </div>
  );
}
