import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Divider, ListSubheader, Stack, IconButton } from '@mui/material';
import XLogo from './XLogo';
import DeleteIcon from '@mui/icons-material/Delete';

const TwitterNode = ({ id, data, isConnectable }) => {
  const { setNodes, setEdges } = useReactFlow();

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const newData = { ...node.data, [field]: value };
          if (field === 'operation') {
            newData.actionType = getActionType(value);
          }
          return { ...node, data: newData };
        }
        return node;
      })
    );
  };

  const getActionType = (operation) => {
    const actionMap = {
      'postTweet': 'TWITTER_POST_TWEET',
      'postReply': 'TWITTER_POST_REPLY',
      'deleteTweet': 'TWITTER_DELETE_TWEET',
      'retweet': 'TWITTER_RETWEET',
      'unretweet': 'TWITTER_UNRETWEET',
      'like': 'TWITTER_LIKE',
      'unlike': 'TWITTER_UNLIKE',
      'follow': 'TWITTER_FOLLOW',
      'unfollow': 'TWITTER_UNFOLLOW',
      'getUserInfo': 'TWITTER_GET_USER_INFO',
      'getTweet': 'TWITTER_GET_TWEET',
      'searchTweets': 'TWITTER_SEARCH_TWEETS'
    };
    return actionMap[operation] || '';
  };

  const handleSwitchChange = (field) => (event) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: event.target.checked } }
          : node
      )
    );
  };

  const onDelete = (e) => {
    e.stopPropagation();
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        minWidth: '250px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Handle type="target" position="top" isConnectable={isConnectable} />
      
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        sx={{ 
          mb: 1,
          pb: 1,
          borderBottom: '1px solid #e0e0e0',
          pr: 4
        }}
      >
        <XLogo sx={{ color: '#000000' }} />
        <Typography variant="subtitle2">X (Twitter)</Typography>
      </Stack>

      <IconButton 
        size="small" 
        onClick={onDelete}
        sx={{ 
          position: 'absolute',
          top: 12,
          right: 12,
          bgcolor: 'rgba(0,0,0,0.05)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <TextField
        fullWidth
        label="API Key"
        type="password"
        value={data.apiKey || ''}
        onChange={handleChange('apiKey')}
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="API Secret"
        type="password"
        value={data.apiSecret || ''}
        onChange={handleChange('apiSecret')}
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Access Token"
        type="password"
        value={data.accessToken || ''}
        onChange={handleChange('accessToken')}
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Access Token Secret"
        type="password"
        value={data.accessTokenSecret || ''}
        onChange={handleChange('accessTokenSecret')}
        sx={{ mb: 1 }}
      />

      <FormControl 
        fullWidth 
        sx={{ 
          mb: 1,
          '& .MuiInputLabel-root': {
            color: '#1976d2',
            fontWeight: 500
          },
          '& .MuiSelect-select': {
            cursor: 'pointer'
          },
          '& .MuiOutlinedInput-root': {
            cursor: 'pointer',
            '& .MuiOutlinedInput-notchedOutline': {
              cursor: 'pointer'
            }
          }
        }}
      >
        <InputLabel>Select Operation ↓</InputLabel>
        <Select
          value={data.operation || 'postTweet'}
          onChange={handleChange('operation')}
          label="Operation"
          MenuProps={{
            disablePortal: false,
            PaperProps: {
              sx: {
                maxHeight: 450,
                width: '70px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 9999,
                '& .MuiMenuItem-root': {
                  padding: '2px 2px',
                  fontSize: '0.7rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '&:hover': {
                    backgroundColor: '#f0f7ff'
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    '&:hover': {
                      backgroundColor: '#e3f2fd'
                    }
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                },
                '& .MuiListSubheader-root': {
                  backgroundColor: '#1976d2',
                  lineHeight: '24px',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  color: '#ffffff',
                  padding: '2px 2px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                },
                '& .MuiDivider-root': {
                  margin: '4px 0',
                  borderColor: '#e0e0e0'
                }
              }
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            }
          }}
        >
          <ListSubheader>Tweet Operations</ListSubheader>
          <MenuItem value="postTweet">📝 Post Tweet</MenuItem>
          <MenuItem value="postReply">↩️ Post Reply</MenuItem>
          <MenuItem value="postThread">🧵 Post Thread</MenuItem>
          <MenuItem value="deleteTweet">🗑️ Delete Tweet</MenuItem>
          <MenuItem value="retweet">🔄 Retweet</MenuItem>
          <MenuItem value="unretweet">🔙 Unretweet</MenuItem>
          <MenuItem value="like">❤️ Like Tweet</MenuItem>
          <MenuItem value="unlike">💔 Unlike Tweet</MenuItem>
          
          <Divider />
          <ListSubheader>User Operations</ListSubheader>
          <MenuItem value="follow">👥 Follow User</MenuItem>
          <MenuItem value="unfollow">👤 Unfollow User</MenuItem>
          <MenuItem value="getUserInfo">ℹ️ Get User Info</MenuItem>
          <MenuItem value="getTweet">📄 Get Tweet</MenuItem>
          <MenuItem value="searchTweets">🔍 Search Tweets</MenuItem>
          <MenuItem value="getUserTimeline">📱 Get User Timeline</MenuItem>
          <MenuItem value="getFollowers">👥 Get Followers</MenuItem>
          <MenuItem value="getFollowing">👥 Get Following</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Tweet Text"
        multiline
        rows={2}
        value={data.tweetText || ''}
        onChange={handleChange('tweetText')}
        placeholder="Enter tweet content"
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Tweet ID"
        value={data.tweetId || ''}
        onChange={handleChange('tweetId')}
        placeholder="Tweet ID for replies/actions"
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Username"
        value={data.username || ''}
        onChange={handleChange('username')}
        placeholder="Twitter username (without @)"
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Media URLs"
        multiline
        rows={1}
        value={data.mediaUrls || ''}
        onChange={handleChange('mediaUrls')}
        placeholder="URLs of media to attach (one per line)"
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Search Query"
        value={data.searchQuery || ''}
        onChange={handleChange('searchQuery')}
        placeholder="Search query for tweets"
        sx={{ mb: 1 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.includeRetweets || false}
            onChange={handleSwitchChange('includeRetweets')}
          />
        }
        label="Include Retweets"
        sx={{ mb: 1 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.includeReplies || false}
            onChange={handleSwitchChange('includeReplies')}
          />
        }
        label="Include Replies"
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Max Results"
        type="number"
        value={data.maxResults || ''}
        onChange={handleChange('maxResults')}
        placeholder="Maximum number of results"
        sx={{ mb: 1 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default TwitterNode;
