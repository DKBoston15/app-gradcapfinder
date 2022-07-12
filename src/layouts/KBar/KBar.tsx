import React from 'react';
import {
  KBarResults,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
} from 'kbar';
import { KBarItem, KBarList } from '../navigationLayout.styles';

const searchStyle = {
  padding: '12px 16px',
  fontSize: '22px',
  width: '100%',
  boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
  outline: 'none',
  border: 'none',
  background: 'white',
};

const animatorStyle = {
  maxWidth: '800px',
  width: '100%',
  background: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: 'var(--shadow)',
};

const groupNameStyle = {
  padding: '8px 16px',
  fontSize: '20px',
  opacity: 0.5,
};

const backgroundStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
};

export default function KBar() {
  function RenderResults() {
    const { results, rootActionId } = useMatches();

    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === 'string' ? (
            <div style={groupNameStyle}>{item}</div>
          ) : (
            <ResultItem action={item} active={active} currentRootActionId={rootActionId} />
          )
        }
      />
    );
  }

  const ResultItem = React.forwardRef(
    (
      {
        action,
        currentRootActionId,
      }: {
        action: ActionImpl;
        active: boolean;
        currentRootActionId: ActionId;
      },
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const ancestors = React.useMemo(() => {
        if (!currentRootActionId) return action.ancestors;
        const index = action.ancestors.findIndex((ancestor) => ancestor.id === currentRootActionId);
        return action.ancestors.slice(index + 1);
      }, [action.ancestors, currentRootActionId]);

      return (
        <KBarList ref={ref}>
          <KBarItem>
            {action.icon && action.icon}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                {ancestors.length > 0 &&
                  ancestors.map((ancestor) => (
                    <React.Fragment key={ancestor.id}>
                      <span
                        style={{
                          opacity: 0.5,
                          marginRight: 8,
                        }}>
                        {ancestor.name}
                      </span>
                      <span
                        style={{
                          marginRight: 8,
                        }}>
                        &rsaquo;
                      </span>
                    </React.Fragment>
                  ))}
                <span>{action.name}</span>
              </div>
              {action.subtitle && <span style={{ fontSize: 12 }}>{action.subtitle}</span>}
            </div>
          </KBarItem>
          {action.shortcut?.length ? (
            <div aria-hidden style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
              {action.shortcut.map((sc) => (
                <kbd
                  key={sc}
                  style={{
                    padding: '4px 6px',
                    background: 'rgba(0 0 0 / .1)',
                    borderRadius: '4px',
                    fontSize: 14,
                    textTransform: 'capitalize',
                  }}>
                  {sc}
                </kbd>
              ))}
            </div>
          ) : null}
        </KBarList>
      );
    },
  );

  return (
    <KBarPortal>
      <KBarPositioner style={backgroundStyle}>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}
