import { useState, useEffect } from 'react'
import { App as AppModel, Document } from './model'
import { lib } from '../static/lib'

export function useFolderAndFileManagement(initialState: AppModel) {
  const [currentDocument, setCurrentDocument] = useState<Document>({ ...initialState.documents[0] })
  const [currentFolder, setCurrentFolder] = useState<string>(currentDocument.folderName)
  const [availableFolders, setAvailableFolders] = useState<string[]>([])
  const [availableFiles, setAvailableFiles] = useState<string[]>([])
  const [currentFile, setCurrentFilename] = useState<string>(currentDocument.name)

  useEffect(() => {
    setAvailableFolders(lib.extractFolders(initialState))
    folderChanged(initialState.documents[0].folderName)
  }, [initialState])

  useEffect(() => {
    const files = new Set<string>()
    initialState.documents.forEach(doc => {
      if (doc.folderName === currentFolder) {
        files.add(doc.name)
      }
    })
    setAvailableFiles(Array.from(files))
  }, [currentFolder, initialState])

  useEffect(() => {
    setCurrentFilename(availableFiles[0])
  }, [availableFiles])

  useEffect(() => {
    setCurrentFilename(currentDocument.name)
  }, [currentDocument])

  function folderChanged(folder: string) {
    setCurrentFolder(folder)
  }

  function fileChanged(file: string) {
    const doc = lib.findDoc(initialState, currentFolder, file)
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