import TagBox from 'devextreme-react/cjs/tag-box'
import React from 'react'
import { roles } from '../modals/roller'

export default function RolesTagBox() {
  return (
    <TagBox dataSource={roles} searchEnabled={true} />
  )
}
