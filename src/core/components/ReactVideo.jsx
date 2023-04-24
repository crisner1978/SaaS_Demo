'use client'
import React from 'react'
import ReactPlayer from 'react-player'

export default function ReactVideo({ url }) {
  return <ReactPlayer controls url={url} />
}
