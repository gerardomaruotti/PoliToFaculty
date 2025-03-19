import { JSX, useMemo, useState } from 'react';
import { Tab } from '../../ui/components/Tab';
import { Tabs } from '../../ui/components/Tabs';
import React from 'react';

interface TabOptions {
  title: string;
  renderContent: () => JSX.Element;
}

export const useTabs = (options: TabOptions[]) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const TabsComponent = useMemo(
    () => () =>
      (
        <Tabs selectedIndexes={[selectedTabIndex]}>
          {options.map((o, i) => (
            <Tab key={i} onPress={() => setSelectedTabIndex(i)}>
              {o.title}
            </Tab>
          ))}
        </Tabs>
      ),
    [options, selectedTabIndex],
  );
  const TabsContent = useMemo(
    () => options[selectedTabIndex].renderContent,
    [options, selectedTabIndex],
  );
  return {
    selectedTabIndex,
    Tabs: TabsComponent,
    TabsContent,
  };
};