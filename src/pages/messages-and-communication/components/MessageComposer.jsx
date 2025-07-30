import React, { useState, useRef } from 'react';
        import Button from '../../../components/ui/Button';
        import Icon from '../../../components/AppIcon';

        const MessageComposer = ({ onSendMessage, isSending, disabled }) => {
          const [message, setMessage] = useState('');
          const [attachments, setAttachments] = useState([]);
          const [showEmojiPicker, setShowEmojiPicker] = useState(false);
          const fileInputRef = useRef(null);
          const textareaRef = useRef(null);

          const handleSend = () => {
            if (!message.trim() && attachments.length === 0) return;
            
            onSendMessage(message, attachments);
            setMessage('');
            setAttachments([]);
            
            // Reset textarea height
            if (textareaRef.current) {
              textareaRef.current.style.height = 'auto';
            }
          };

          const handleKeyPress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          };

          const handleInputChange = (e) => {
            setMessage(e.target.value);
            
            // Auto-resize textarea
            const textarea = e.target;
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
          };

          const handleFileSelect = (e) => {
            const files = Array.from(e.target.files);
            const newAttachments = files.map(file => ({
              id: Date.now() + Math.random(),
              file,
              name: file.name,
              size: file.size,
              type: file.type.startsWith('image/') ? 'image' : 'file',
              url: URL.createObjectURL(file)
            }));
            
            setAttachments(prev => [...prev, ...newAttachments]);
            
            // Reset input
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          };

          const removeAttachment = (id) => {
            setAttachments(prev => {
              const attachment = prev.find(att => att.id === id);
              if (attachment?.url) {
                URL.revokeObjectURL(attachment.url);
              }
              return prev.filter(att => att.id !== id);
            });
          };

          const commonEmojis = ['👍', '👎', '😄', '😢', '❤️', '🎯', '🎲', '🎮'];

          const insertEmoji = (emoji) => {
            setMessage(prev => prev + emoji);
            setShowEmojiPicker(false);
            textareaRef.current?.focus();
          };

          return (
            <div className="p-4 bg-card border-t border-border">
              {/* Attachments Preview */}
              {attachments?.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {attachments.map(attachment => (
                    <div key={attachment.id} className="relative group">
                      {attachment.type === 'image' ? (
                        <div className="relative">
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="w-16 h-16 object-cover rounded-lg border border-border"
                          />
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative flex items-center space-x-2 p-2 bg-muted rounded-lg border border-border">
                          <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                          <span className="font-caption text-xs text-foreground truncate max-w-20">
                            {attachment.name}
                          </span>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="ml-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="mb-3 p-3 bg-muted rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {commonEmojis.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => insertEmoji(emoji)}
                        className="text-lg hover:bg-background rounded p-1 transition-colors duration-200"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="flex items-end space-x-2">
                {/* Action Buttons */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                    disabled={disabled}
                    aria-label="Adjuntar archivo"
                  >
                    <Icon name="Paperclip" size={20} />
                  </button>
                  
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                    disabled={disabled}
                    aria-label="Emojis"
                  >
                    <Icon name="Smile" size={20} />
                  </button>
                </div>

                {/* Text Input */}
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe un mensaje..."
                    disabled={disabled}
                    className="w-full max-h-32 px-4 py-2 bg-input border border-border rounded-2xl text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    rows="1"
                  />
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={disabled || isSending || (!message.trim() && attachments.length === 0)}
                  size="sm"
                  className="shrink-0 rounded-2xl"
                >
                  {isSending ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Send" size={16} />
                  )}
                </Button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          );
        };

        export default MessageComposer;