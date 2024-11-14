import { useState } from 'react'

import { SubHeaderWithoutIcon } from '@/components/view'
import { getSessionStorageItem, setSessionStorageItem, TAB_LIST } from '@/utils'

type TabType = (typeof TAB_LIST)[number]

export const Bookmark = () => {
  const storageName = `current-bookmark-tab`
  const initialTab = (getSessionStorageItem(storageName) || TAB_LIST[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

  const handleClickTab = (tab: TabType) => {
    setSessionStorageItem(storageName, tab)
    setCurrentTab(tab)
  }

  return (
    <div>
      <SubHeaderWithoutIcon type="null" title="북마크" />
      <div className="p-medium flex px-4 py-3 font-medium">
        {TAB_LIST.map((tab) => {
          const tabStyle =
            currentTab === tab
              ? 'text-blue-7 border-b-[2px] border-b-blue-5'
              : 'text-grey-6 border-b-[2px] border-b-grey-2'

          return (
            <button
              key={tab}
              className={`grow pb-3 ${tabStyle}`}
              onClick={() => handleClickTab(tab)}
            >
              {tab}
            </button>
          )
        })}
      </div>
    </div>
  )
}
