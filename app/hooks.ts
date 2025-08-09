import { useState, useEffect } from 'react'
import { App as AppModel, Document } from './model'
import { lib } from '../static/lib'

export function useClipboard() {

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => console.log("Text copied to clipboard"))
      .catch(err => console.error("Failed to copy text: ", err))
  }

  function getFromClipboard(): any {
    return navigator.clipboard.readText()
    .then(() => console.log("Text copied from clipboard"))
    .catch(err => console.error("Failed to copy from clipboard: ", err))
  }

  return {
    copyToClipboard, getFromClipboard
  }

}

export function useFolderAndFileManagement(state: AppModel) {
  const [currentDocument, setCurrentDocument] = useState<Document>()
  const [currentFolder, setCurrentFolder] = useState<string>()
  const [availableFolders, setAvailableFolders] = useState<string[]>([])
  const [availableFiles, setAvailableFiles] = useState<string[]>([])
  const [currentFile, setCurrentFilename] = useState<string>()

  useEffect(() => {
    if (state) {
      setCurrentDocument(state.documents[0])
      // setCurrentDocument({ ...initialState.documents[0] })
      setAvailableFolders(lib.extractFolders(state))
      folderChanged(state.documents[0].folderName)
    }
  }, [state])

  useEffect(() => {
    if (!state) return
    const files = new Set<string>()
    state.documents.forEach(doc => {
      if (doc.folderName === currentFolder) {
        files.add(doc.name)
      }
    })
    setAvailableFiles(Array.from(files))
  }, [currentFolder, state])

  useEffect(() => {
    setCurrentFilename(availableFiles[0])
  }, [availableFiles])

  useEffect(() => {
    if (!currentDocument) return
    setCurrentFilename(currentDocument.name)
  }, [currentDocument])

  function folderChanged(folder: string) {
    setCurrentFolder(folder)
  }

  function fileChanged(file: string) {
    const doc = lib.findDoc(state, currentFolder, file)
    setCurrentDocument(doc)
  }

  return {
    currentDocument,
    currentFolder,
    availableFolders,
    availableFiles,
    currentFile,
    folderChanged,
    fileChanged,
    setCurrentFile: setCurrentFilename,
    setCurrentDocument,
  }
}